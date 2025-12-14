"use client";
import { createEvent, getEvents, deleteEvent } from "../actions/event";
import { useEffect, useState } from "react";
import './admindashboard.css'




export default function Admindashboard(){
    const [events, setEvents] = useState<any[]>([]);
     const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);
   async function handleCreate(formData: FormData) {
    await createEvent(formData);
    loadEvents();
  }

    return(
       <div>
        <h1>Admin Dashboard</h1>
         <form action={handleCreate}>
        <input name="title" placeholder="Title" />
        <input name="date" placeholder="Date" />
        <input name="location" placeholder="Location" />
        <input name="price" placeholder="Price" />
        <input name="seats" placeholder="Seats" />
        <input name="image" placeholder="Image URL" />
        <textarea name="description" placeholder="Description" />
        <button type="submit">Add Event</button>
      </form>
       <hr />
        {events.map((e) => (
        <div key={e._id}>
          <h4>{e.title}</h4>
          <button onClick={() => deleteEvent(e._id)}>Delete</button>
        </div>
      ))}
       </div>
    )
}