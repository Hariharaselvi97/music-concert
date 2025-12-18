'use client'
import { useState } from "react";
import './booking.css'





export default function booking(){
type SelectedSeat = {
  seat: string;
  price: number;
  type: "vip" | "gold" | "silver";
};
   const seatData = {
  vip: {
    price: 3000,
    seats: ["V1", "V2", "V3", "V4","V5","V6","V7","V8","V9","V10","V11","V12","V13","V14","V15","V16","V17","V18","V19","V20"],
  },
  gold: {
    price: 2000,
    seats: ["G1", "G2", "G3", "G4", "G5", "G6","G7","G8","G9","G10","G11","G12","G13","G14","G15","G16","G17","G18","G19","G20",
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

const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);

  const toggleSeat = (seat:string, price:number, type:"vip" | "gold" | "silver") => {
    const exists = selectedSeats.find((s) => s.seat === seat);

    if (exists) {
      setSelectedSeats(selectedSeats.filter((s) => s.seat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, { seat, price, type }]);
    }
  };

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);


   return(
     <div className="container">
      <h2 className="text-center"> Select Your Seats</h2>

      {Object.entries(seatData).map(([type, data]) => (
        <div key={type} className="section">
          <h4>
            {type.toUpperCase()} – ₹{data.price}
          </h4>
          <div className="seats">
            {data.seats.map((seat) => (
              <button
                key={seat}
                className={`seat ${
                  selectedSeats.some((s) => s.seat === seat) ? "selected" : ""
                }`}
                onClick={() => toggleSeat(seat, data.price, type)}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>
      ))}

      <hr />

      <h5>Selected Seats:</h5>
      <p>
        {selectedSeats.map((s) => s.seat).join(", ") || "None"}
      </p>

      <h4>Total: ₹{totalAmount}</h4>

      <button className="btn btn-success">Book Tickets</button>
    </div>
   )
   
    
}