"use server";
import { NextResponse } from "next/server";
import {Booking} from "@/modals/Booking";
import {Connectdb} from "@/lib/mongodb";
import { sendBookingEmail } from "@/lib/sendEmail";
import { v4 as uuidv4 } from "uuid";





export async function getBookedSeats(eventId:string) {
  
  await Connectdb();
  const bookings = await Booking.find({eventId}).select("seats");;
  return bookings.flatMap((b) => b.seats)

}



export async function bookTickets(
  eventId:String,
 eventTitle: string,
  eventDate: string | Date,
  seats: String[],
  totalAmount: number,
  email: string,
  
) {

  
  await Connectdb();
  
  // const bookingId = uuidv4();

  const booking = await Booking.create({
    eventId,
    // bookingId,
    eventTitle,
    eventDate,
    seats,
    totalAmount,
    email,
    status: "BOOKED",
  });

  // await sendBookingEmail(email, {
  //   title: eventTitle,
  //   eventDate: new Date(eventDate).toLocaleDateString(),
  //   seats,
  //   totalAmount
  // });
  

  // return {
  //   // success: true,
  //   bookingId: booking._id.toString()
  // };

    const bookingId = booking._id.toString(); 

  
  await sendBookingEmail(email, {
    bookingId,  
    title: eventTitle,
    eventDate: new Date(eventDate).toLocaleDateString(), 
    seats,
    totalAmount
  });

 
  return { bookingId };

}