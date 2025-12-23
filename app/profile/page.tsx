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
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [bookingId, setBookingId] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>("");
const [eventDate, setEventDate] = useState<string>("");


     useEffect(() => {
  const name = localStorage.getItem("username") || "";
  const userEmail = localStorage.getItem("email") || "";
   
   setEventTitle(localStorage.getItem("eventTitle") || "");
  setEventDate(localStorage.getItem("eventDate") || ""); 

   const seats = JSON.parse(
      localStorage.getItem("selectedSeats") || "[]"
    );

    const total = Number(
      localStorage.getItem("totalAmount") || 0
    );

    const id = localStorage.getItem("bookingId") || "";
    setBookingId(id);

    setProfile((prev: any) => ({
    ...prev,
    username: name,
    email: userEmail
  }));

     setSelectedSeats(seats);
  setTotalAmount(total);

  
  }, []);
    return(
      
        <>
         <div className='back'> <Link href="/" className='pro'>Back to home</Link></div>

       <div className="ticket">
      <div className="ticket-header">
        <h3 style={{color:"green",fontFamily:"cursive"}}>Welcome... {profile.username}</h3>
         
      </div>
      <div className="ticket-body">
         <div className="ticket-row">
          <span className="label">BookingID : </span>
          <span className="value">{"MB" + bookingId.slice(0, 8)}</span>
        </div>
         <div className="ticket-row">
          <span className="label">Title : </span>
          <span className="value">{eventTitle}</span>
        </div>
         <div className="ticket-row">
          <span className="label">Date : </span>
          <span className="value">{new Date(eventDate).toDateString()}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Seats : </span>
          <span className="value">{selectedSeats.join(', ')}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Total : </span>
          <span className="value">₹{totalAmount}</span>
        </div>
      </div>
      <div className="ticket-footer">
        <p>Thank you for booking!!</p>
      </div>
    </div>
  
      </>
    ) 
}