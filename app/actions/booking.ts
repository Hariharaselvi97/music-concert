"use server";

import {Booking} from "@/modals/Booking";
import {Connectdb} from "@/lib/mongodb";
// import { sendBookingEmail } from "@/lib/sendEmail";
import { v4 as uuidv4 } from "uuid";


export async function getBookedSeats() {
  await Connectdb();
  const bookings = await Booking.find({});
  return bookings.flatMap((b) => b.seats);
}

export async function bookTickets(
  seats: string[],
  totalAmount: number,
  email: string,
  
) {
  await Connectdb();
  
  const bookingId = uuidv4();

  const booking = await Booking.create({
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