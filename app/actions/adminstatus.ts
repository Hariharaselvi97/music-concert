"use server";
import { unstable_noStore as noStore } from "next/cache";
import { Connectdb } from "@/lib/mongodb";
import { Booking } from "@/modals/Booking";


export async function getTicketsSoldForEvent(eventId: string) {
  noStore();
  await Connectdb();

const bookings = await Booking.find({ eventId, status: "BOOKED" }).select("seats");
  const ticketsSold = bookings.reduce((sum, b) => sum + b.seats.length, 0);

  return ticketsSold;
}

