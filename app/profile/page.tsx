'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import './profile.css'
import { useRouter } from "next/navigation";
import { FaEye ,FaRegEyeSlash } from "react-icons/fa";



export default function Profile(){

const router = useRouter(); 
 useEffect(() => {
  const checkUser = async () => {
    const user = localStorage.getItem("username");
    if (!user) router.replace("/login");
  };
  checkUser();
}, []);


      const [profile, setProfile] = useState<any>({
    username: "",
    email: "",})

     useEffect(() => {
  const name = localStorage.getItem("username") || "";
  const userEmail = localStorage.getItem("email") || "";
    setProfile((prev: any) => ({
    ...prev,
    username: name,
    email: userEmail
  }));
  }, []);
    return(
        <>
            <div className='back'> <Link href="/" className='pro'>Back to home</Link></div>

      <div>
        <h2>Welcome {profile.username}</h2>
      </div>
      </>
    )
}