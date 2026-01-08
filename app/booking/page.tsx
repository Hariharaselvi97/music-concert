'use client'
import { useState,useEffect } from "react";
// import { bookTickets, getBookedSeats } from "../actions/booking";
import { bookTickets ,getBookedSeats} from "../actions/booking";

import './booking.css'
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";




// export default function Booking({ eventId }: { eventId: string }){
  export default function Booking(){
 const router = useRouter(); 
 const searchParams = useSearchParams();
const eventId = searchParams.get("eventId")!;
const eventTitle = searchParams.get("title");
const eventDate = searchParams.get("date");

   type Seat={
      seat:string,
      price:number,
      type: "vip" | "gold" | "silver"
   }

   const seatData = {
  vip: {
    price: 3000,
    seats: ["V1", "V2", "V3", "V4","V5","V6","V7","V8","V9","V10",
      "V11","V12","V13","V14","V15","V16","V17","V18","V19","V20"],
  },
  gold: {
    price: 2000,
    seats: ["G1", "G2", "G3", "G4", "G5", "G6","G7","G8","G9","G10",
      "G11","G12","G13","G14","G15","G16","G17","G18","G19","G20",
      "G21","G22","G23","G24","G25","G26","G27","G28","G29","G30"
    ],
  },
  silver: {
    price: 1000,
    seats: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8","S9","S10",
      "S11","S12","S13","S14","S15","S16","S17","S18","S19","S20",
      "S21","S22","S23","S24","S25","S26","S27","S28","S29","S30",
      "S31","S32","S33","S34","S35","S36","S37","S38","S39","S40",
      "S41","S42","S43","S44","S45","S46","S47","S48","S49","S50"
    ],


  },
};

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  // const [modalMessage, setModalMessage] = useState({ type: "", text: "" });
  const [email, setEmail] = useState("");

  

  useEffect(() => {
    async function loadSeats() {
      const booked = await getBookedSeats(eventId);
      setBookedSeats(booked);
    }
    loadSeats();
  }, [eventId]);



// const fetchBookedSeats = async () => {
//   if (!eventId) return;
//   try {
//     const res = await fetch(`/api/booked-seats?eventId=${eventId}`);
//     const data: string[] = await res.json();
//     setBookedSeats(data);
//   } catch (err) {
//     console.error("Failed to load booked seats", err);
//   }
// };

// // Now it’s safe to use
// useEffect(() => {
//   fetchBookedSeats();
// }, [eventId]);


 
 
  

  const toggleSeat = (seat: string, price: number, type:"vip" | "gold" | "silver") => {
     
    const exists = selectedSeats.find((s) => s.seat === seat);

    if (exists) {
      setSelectedSeats(selectedSeats.filter((s) => s.seat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, { seat, price, type }]);
    }
  };

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  //  const bookingId = uuidv4();


 const handleBooking = async () => {
  //   const user = localStorage.getItem("user");

  //   if (!user) {
  //   alert("Login required!");
  //   router.push("/login");
  //   return;
  //  }
    

   
    if (selectedSeats.length === 0) {
      alert("Select seats first!");
      return;
    }
    // await bookTickets( eventId,selectedSeats.map(s => s.seat), totalAmount,email);
    try {
        //  const bookingId = uuidv4();

        // await bookTickets( eventId,selectedSeats.map(s => s.seat), totalAmount,email);

      const res = await bookTickets(
      eventId,
      selectedSeats.map(s => s.seat),
      totalAmount,
      email
    );   
      
      // await fetchBookedSeats();
      // setSelectedSeats([]);
      //  setShowModal(true);
   
       localStorage.setItem("eventTitle", eventTitle || "");
       localStorage.setItem("eventDate", eventDate || "");
     
       localStorage.setItem("bookingId", res.bookingId);
       localStorage.setItem("bookingStatus", "BOOKED");

       localStorage.setItem("selectedSeats",JSON.stringify(selectedSeats.map((s) => s.seat)) );
       localStorage.setItem( "totalAmount", totalAmount.toString() );

     
    

      setShowModal(true);
      setBookedSeats(prev => [...prev, ...selectedSeats.map(s => s.seat)]);
      setSelectedSeats([]);

      setTimeout(() => {
      router.push("/profile");
    }, 2000); // 2000ms = 2 seconds

   } catch (err) {
      console.error(err);
      alert("Booking failed. Try again.");
    }
  };


   const [showModal, setShowModal] = useState(false);
  const closeModal=()=> setShowModal(false);
  
  
   

   return(
     < div key={eventId}>
      
        {/* <div className='back'> <Link href="/" className='pro'>Back to home</Link></div> */}

     <div className="con" data-aos="fade-right" data-aos-duration="1000">
       <h4 style={{color:"darkblue",textAlign:"center"}}>{eventTitle}</h4>
      <p  style={{color:"darkblue",textAlign:"center"}}>{new Date(eventDate!).toDateString()}</p>
      <h2 style={{textAlign:"center",fontFamily:"cursive",color:"green"}}> Select Your Seats</h2>
  
     {Object.entries(seatData).map(([type, data]) => (
        <div key={type} className="section">
          <h5>
            {type.toUpperCase()} – ₹{data.price}
           </h5>
          <div className="seats">

           {data.seats.map((seat) => {
           
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.some((s) => s.seat === seat);

  return (
    <button
    
      key={seat}
      disabled={isBooked}
      onClick={() => toggleSeat(seat, data.price, type as any)}
      className={`seat 
        ${isBooked ? "booked" : ""} 
        ${isSelected ? "selected" : ""}`}
    >
      {seat}
    </button>
  );
})}
        
          </div>
        </div>
      ))}

      <hr />

      <h5 style={{textAlign:"center"}}>Selected Seats: {selectedSeats.map((s) => s.seat).join(", ") || "None"}</h5>
     
      <h5 style={{textAlign:"center"}}>Total: ₹{totalAmount}</h5>

      <button className="btn btn-success bookbut" onClick={handleBooking} >Book Tickets</button>
      
    
       {showModal && (
        <div className="modal show d-block" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body" >
                <h4 style={{ marginTop: "10px" ,color:"green",textAlign:"center"}}>Booked Successfully 🎉</h4>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
    )}
    </div>
    </div>
  );
}