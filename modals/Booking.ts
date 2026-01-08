import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({

   seats: {
    type: [String],   // 👈 array of strings
    required: true,
  },
  totalAmount:Number,
  eventId: String,

   status: {
    type: String,
    enum: ["BOOKED", "CANCELLED"],
    default: "BOOKED",
  },


});

export const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema, "bookings");