'use client'
import { useEffect, useState } from "react";
import './home.css'


export default function Home(){

   const texts = [
    "Feel the music. Live the moment..!!",
    "Experience concerts like never before!",
    "Discover your favorite artists!"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // text changes every 3 seconds

    return () => clearInterval(interval);
  }, []);
    return(
       <div className="image">
       <div className="hero-text">
       <h1 style={{marginTop:"-80px",fontSize:"35px"}}>{texts[currentIndex]}</h1>
       </div>
      </div>
       

    )
}