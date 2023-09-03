"use client"
import useSocket, {socketProvderVals} from "@/providers/SocketProvider";
import Link from "next/link";
import {FormEvent, useCallback, useEffect, useState} from "react";


export default function Home() {

  const {socket}:socketProvderVals = useSocket();
  const [isConnected, setIsConnected] = useState(false);

  const [roomConnectId,setRoomConnectId] = useState("")
  const [chatmessage,setChatmessage] = useState("")

  const [messages,setMessages] = useState<String[]>([]);

  const connectionStatus = useCallback((conn:any)=>{
    setIsConnected(true)
     console.log(conn? conn:"No Message incomming")
  },[setIsConnected])

  function handleRoomConnection(form:FormEvent){
      form.preventDefault()
      console.log(roomConnectId)
      socket?.emit("join-room",{roomId:roomConnectId})
      setRoomConnectId("")
  }
  function sendMessage(e:FormEvent){
    e.preventDefault()
    console.log(socket)
    socket?.emit("sendMessage",{message:chatmessage})
    setMessages([...messages,chatmessage])
  }

  useEffect(()=>{
      if(socket == null) return
      console.log(socket)
      socket.on("CC",connectionStatus)

      socket.on("recieved",(message:{message:String})=>{
        setMessages([...messages,message.message])
      })


    return ()=> {socket && socket.close(); setIsConnected(false)}
  },[connectionStatus,socket])

  return (
    <main className="bg-slate-600 h-full p-4 flex flex-col items-center text-gray-100">
      <header className="text-2xl">
        Hello, How are you, I am under the water, Please help me. Here too much raining
      </header>
      <Link className="underline hover:text-gray-400 p-2" href={'/videocall'}>
        Do a video Call?
      </Link>
      Online Status: {isConnected && socket? <>Connected at {socket.id}</>:<>NotConnected</>}
      {socket && isConnected && (
        <>
          <form onSubmit={handleRoomConnection}>
              <input 
                onChange={(e)=>{setRoomConnectId(e.target.value)}}
                required
                value={roomConnectId}
                className="text-black text-2xl"
                name="roomJoinInput"
                placeholder="Room Id"
                />
              <button
                className="p-2 m-1 border border-white hover:bg-opacity-500 bg-green-600"
              >Connect</button>
          </form>
        </>
      )}
      <div className="flex flex-col p-5">
        <form onSubmit={sendMessage}>
          <input
            required
            onChange={(e)=>{setChatmessage(e.target.value)}}
            className="text-black text-2xl"
            placeholder="Chat"
            name="chatmessage" 
            value={chatmessage}/>
          <button
            className="p-2 m-1 border border-white hover:bg-opacity-500 bg-green-600"
          >
            SendMessage
          </button>
        </form>
        {
          messages && messages.map((e,i) =>(
            <div key={i+"Something"} className="flex items-center text-red-400">
              {e}
            </div>
          ))
        }
      </div>
    </main>
  )
}



