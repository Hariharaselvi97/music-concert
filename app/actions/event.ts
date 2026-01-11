"use server";
// export const runtime = "nodejs";
import { Connectdb } from "@/lib/mongodb";
import { Event } from "@/modals/Event";
import cloudinary from "@/lib/cloudinary";


export async function createEvent(formData: FormData) {
  await Connectdb();

const file = formData.get("image") as File;
let imageUrl = "";

   if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "concerts" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    imageUrl = upload.secure_url;
  }
  

  await Event.create({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    location: formData.get("location"),
    ticketprice: Number(formData.get("ticketprice") || 0),
    totalseats: Number(formData.get("totalseats") || 0),
    image: imageUrl, 
  });

  return { success: true };
}

export async function getEvents() {
  await Connectdb();

  // const events = await Event.find().lean(); // ✅ IMPORTANT

  // return events.map((e) => ({
  //   ...e,
  //   _id: e._id.toString(), // ✅ convert ObjectId
  // }));

const events = await Event.find();

  return events.map((e) => ({
    ...e.toObject(),
    _id: e._id.toString(),
  }));
}

export async function deleteEvent(id: string) {
  await Connectdb();
  await Event.findByIdAndDelete(id);
}
export async function updateEvent(id: string,  data:any) {
  await Connectdb();
  await Event.findByIdAndUpdate(id, data);
}
