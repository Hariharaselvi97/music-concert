"use server";
import mongoose from "mongoose";
import { Connectdb } from "@/lib/mongodb";
import { Booking } from "@/modals/Booking";

export async function cancelbooking(bookingId: string) {
    if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
    return { success: false, message: "Invalid booking id" };
  }
  await Connectdb();

 const deleted = await Booking.findByIdAndDelete(bookingId);

  if (!deleted) {
    return { success: false, message: "Booking not found" };
  }

  return { success: true };
}