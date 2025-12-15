"use server";

import { Connectdb } from "@/lib/mongodb";
import { Event } from "@/modals/Event";

export async function createEvent(formData: FormData) {
  await Connectdb();

  await Event.create({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    location: formData.get("location"),
    ticketprice: Number(formData.get("ticketprice")),
    totalseats: Number(formData.get("totalseats")),
    image: formData.get("image"),
  });

  return { success: true };
}

export async function getEvents() {
  await Connectdb();

  const events = await Event.find().lean(); // ✅ IMPORTANT

  return events.map((e) => ({
    ...e,
    _id: e._id.toString(), // ✅ convert ObjectId
  }));
}

export async function deleteEvent(id: string) {
  await Connectdb();
  await Event.findByIdAndDelete(id);
}
export async function updateEvent(id: string, data: any) {
  await Connectdb();
  await Event.findByIdAndUpdate(id, data);
}