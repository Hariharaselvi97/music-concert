import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  ticketprice: Number,
  totalseats: Number,
  image: String,
});

export const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema,"events");