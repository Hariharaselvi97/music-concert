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
const [showModal, setShowModal] = useState(false);
 
  


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

    setShowModal(true);

    setBookingId("");
    setSelectedSeats([]);
    setTotalAmount(0);

  localStorage.removeItem("bookingId");
  localStorage.removeItem("selectedSeats");
  localStorage.removeItem("totalAmount");
  localStorage.removeItem("bookingStatus");
  localStorage.removeItem("eventTitle");
  localStorage.removeItem("eventDate");
  };
const closeModal=()=> setShowModal(false);
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
   

     {bookingId && (
  <button
    style={{
      background: "red",
      color: "white",
      padding: "8px 16px",
      borderRadius: "6px",
      marginTop: "10px",
      cursor: "pointer",
      marginLeft:"150px"
    }}
    onClick={handleCancel}
  >
    Cancel Ticket
  </button>
)}
      
   </div>
   {showModal && (
        <div className="modal show d-block" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body" >
                <h4 style={{ marginTop: "10px" ,color:"green",textAlign:"center"}}>Ticket Cancelled </h4>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
    )}
      </>
    ) 
}