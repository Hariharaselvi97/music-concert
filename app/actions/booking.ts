"use server";
import { NextResponse } from "next/server";
import {Booking} from "@/modals/Booking";
import {Connectdb} from "@/lib/mongodb";
import { sendBookingEmail } from "@/lib/sendEmail";
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

    const bookingId = booking._id.toString(); // ✅ define it here

  // 3️⃣ Send confirmation email
  await sendBookingEmail(email, {
    bookingId,  // now it exists
    title: eventTitle,
    eventDate: new Date(eventDate).toLocaleDateString(), 
    seats,
    totalAmount
  });

  // 4️⃣ Return bookingId to frontend
  return { bookingId };

}