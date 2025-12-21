"use server";

import {Booking} from "@/modals/Booking";
import {Connectdb} from "@/lib/mongodb";

export async function getBookedSeats() {
  await Connectdb();
  const bookings = await Booking.find({});
  return bookings.flatMap((b) => b.seats);
}

export async function bookTickets(
  seats: string[],
  totalAmount: number
) {
  await Connectdb();

  const booking = await Booking.create({
    seats,
    totalAmount,
  });

  return {
    success: true,
    bookingId: booking._id.toString(),
  };
}