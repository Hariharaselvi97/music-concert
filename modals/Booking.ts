import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
   
    eventTitle: {
    type: String,
    required: true,
  },

  eventDate: {
    type: Date,
    required: true,
  },
   seats: {
    type: [String],   
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