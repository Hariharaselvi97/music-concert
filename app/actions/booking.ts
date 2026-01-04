"use server";
import { NextResponse } from "next/server";
import {Booking} from "@/modals/Booking";
import {Connectdb} from "@/lib/mongodb";
// import { sendBookingEmail } from "@/lib/sendEmail";
import { v4 as uuidv4 } from "uuid";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const eventId = searchParams.get("eventId");

//   if (!eventId) {
//     return NextResponse.json([], { status: 400 });
//   }

//   await Connectdb();

//   const bookings = await Booking.find({ eventId }).select("seats");

//   const bookedSeats = bookings.flatMap(b => b.seats);

//   return NextResponse.json(bookedSeats);
// }



export async function getBookedSeats(eventId:string) {
  
  await Connectdb();
  
  const bookings = await Booking.find({eventId}).select("seats");;
  return bookings.flatMap((b) => b.seats)

}



export async function bookTickets(
  eventId:String,
  seats: String[],
  totalAmount: number,
  email: string,
  
) {

  
  await Connectdb();
  
  const bookingId = uuidv4();

  const booking = await Booking.create({
    eventId,
    bookingId,
    seats,
    totalAmount,
    email,
  });

  // await sendBookingEmail({
  //   to: email,
  //   bookingId,
  //   seats,
  //   totalAmount,
  // });

  return {
    success: true,
    bookingId,
  };
}