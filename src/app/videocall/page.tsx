"use client";
import React, {useEffect, useRef} from 'react'

export default function Page() {
    const video = useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        let track:MediaStream;
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
        <div>
            <video ref={video} autoPlay/>
        </div>
    )
}
