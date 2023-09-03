"use client";
import useSocket from '@/providers/SocketProvider';
import React, {useEffect, useRef} from 'react'

export default function Page() {
    const video = useRef<HTMLVideoElement>(null);
    const {socket} = useSocket()

    useEffect(()=>{
        let track:MediaStream;
        let connection = new RTCPeerConnection({
            iceServers:[{urls:"stun:stun.l.google.com:19302"}]
        });
        if(connection){
            connection.onicecandidate = (event) =>{
                console.log("NEW ACTIVE USER");
                console.log(event);
                if(event.candidate){
                    socket && socket.emit("addCandidate",{
                        type:"candidate",
                        candidate: event.candidate
                    })
                }
            }
        }

        console.log(connection)
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream)=>{
            if(video.current)
                video.current.srcObject = stream
                track = stream    
                console.log(track)
        })
        return ()=>{
            track.getTracks().forEach((e)=>{
                e.stop();
            })
        }

    },[])
    return (
        <div className="bg-slate-600 h-full flex flex-col justify-center items-center">
            <video className="p-10 h-full" ref={video} autoPlay/>
        </div>
    )
}
