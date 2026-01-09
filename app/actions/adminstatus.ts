"use server";
import { Connectdb } from "@/lib/mongodb";
import { Booking } from "@/modals/Booking";

// Get total tickets sold for a specific event
export async function getTicketsSoldForEvent(eventId: string) {
  await Connectdb();

const bookings = await Booking.find({ eventId, status: "BOOKED" }).select("seats");
  const ticketsSold = bookings.reduce((sum, b) => sum + b.seats.length, 0);

  return ticketsSold;
}