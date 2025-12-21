import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  seats: [String],
  totalAmount: Number,
});

export const Booking = 
mongoose.models.Booking ||mongoose.model("Booking", BookingSchema,"bookings");