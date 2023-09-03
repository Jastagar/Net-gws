"use client"
import React, {ReactNode, useEffect, useState, useContext} from 'react'
import {Socket, io} from 'socket.io-client'

export type socketProvderVals = {
    socket: Socket | null
}

const socketContext = React.createContext<socketProvderVals>({
    socket: null
})

export function SocketProvider(props:{children: ReactNode}) {

    const [socket,setSocket] = useState<Socket | null>(null)

    useEffect(()=>{
        const newSocket = io("http://localhost:3001/");
        setSocket(newSocket)
        return ()=>{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[])

    const value:socketProvderVals ={
        socket
    }
    return (
        <socketContext.Provider value={value}>
            {props.children}
        </socketContext.Provider>
    )
}

export default function useSocket(){
    return useContext(socketContext)
}