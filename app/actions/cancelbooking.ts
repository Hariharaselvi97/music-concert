"use server";
import mongoose from "mongoose";
import { Connectdb } from "@/lib/mongodb";
import { Booking } from "@/modals/Booking";

export async function cancelbooking(bookingId: string) {
    if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
    return { success: false, message: "Invalid booking id" };
  }
  await Connectdb();

  await Booking.findByIdAndUpdate(bookingId, {
    status: "CANCELLED",
  });

  return { success: true };
}