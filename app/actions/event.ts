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
    ticketprice: Number(formData.get("price")),
    totalseats: Number(formData.get("seats")),
    image: formData.get("image"),
  });

  return { success: true };
}

export async function getEvents() {
  await Connectdb();
  return await Event.find();
}

export async function deleteEvent(id: string) {
  await Connectdb();
  await Event.findByIdAndDelete(id);
}