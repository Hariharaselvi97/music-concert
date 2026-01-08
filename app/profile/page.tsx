'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import './profile.css'
import { useRouter } from "next/navigation";
import { FaEye ,FaRegEyeSlash } from "react-icons/fa";
import { cancelbooking } from "../actions/cancelbooking";


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
const [status, setStatus] = useState<string>("BOOKED");
const [seats, setSeats] = useState<{ seatNumber: string; booked: boolean }[]>([]);




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

    setStatus(localStorage.getItem("bookingStatus") || "BOOKED");

    setProfile((prev: any) => ({
    ...prev,
    username: name,
    email: userEmail
  }));

     setSelectedSeats(seats);
  setTotalAmount(total);

  
  }, []);


   const handleCancel = async () => {
    if (!bookingId) return;

    const res = await cancelbooking(bookingId);

    if (!res?.success) {
      alert(res?.message || "Cancellation failed");
      return;
    }

    
    localStorage.setItem("bookingStatus", "CANCELLED");
    setStatus("CANCELLED");

   
    setSelectedSeats([]); 

    alert("Ticket cancelled successfully");

  //    const res = await cancelbooking(bookingId);
  // if (res?.success) {
  //   alert("Ticket cancelled successfully");

  //   // 1️⃣ Update seat availability in UI
  //   setSeats((prevSeats) =>
  //     prevSeats.map((s) => (selectedSeats.includes(s.seatNumber) ? { ...s, booked: false } : s))
  //   );

  //   // 2️⃣ Update booking status
  //   setStatus("CANCELLED");
  // } else {
  //   alert(res?.message || "Cancellation failed");
  // }
  };

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

      {status === "BOOKED" &&  bookingId &&(
  <button
    style={{
      background: "red",
      color: "white",
      padding: "8px 16px",
      borderRadius: "6px",
      marginTop: "10px",
      cursor: "pointer",
    }}
    onClick={handleCancel}
  >
    Cancel Ticket
  </button>
)}

{status === "CANCELLED" && (
  <p style={{ color: "red", fontWeight: "bold" }}>
    ❌ Ticket Cancelled
  </p>
)}
      <div className="ticket-footer">
        <p>Thank you for booking!!</p>
      </div>
    </div>
  
      </>
    ) 
}