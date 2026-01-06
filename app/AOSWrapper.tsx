'use client';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AOSWrapper ({children}:{children:React.ReactNode}){
    useEffect(()=>{
       Aos.init({ once: false });
    },[]);

    return<>{children}</>
}