"use client";
import { createEvent, getEvents, deleteEvent ,updateEvent } from "../actions/event";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import './admindashboard.css'




export default function Admindashboard(){
    const [events, setEvents] = useState<any[]>([]);
    const [editEvent, setEditEvent] = useState<any>(null);


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
   const handleEdit = (event: any) => {
  setEditEvent(event); // store selected row data
};
  const handleDelete = async (id: string) => {
  await deleteEvent(id);
  loadEvents(); // refresh table

 
};

    return(
       <div className="ad">
        <h1>Admin Dashboard</h1>
         <form action={handleCreate} className="dashin">
        <input type="text"name="title" placeholder="Title" /><br></br><br></br>
        <input type="date"name="date" placeholder="Date" /><br></br><br></br>
        <input type="text"name="location" placeholder="Location" /><br></br><br></br>
        <input type="number"name="ticketprice" placeholder="Price" /><br></br><br></br>
        <input type="number"name="totalseats" placeholder="Seats" /><br></br><br></br>
        <input name="image" placeholder="Image URL" /><br></br><br></br>
        <textarea name="description" placeholder="Description" /><br></br><br></br>
        <button type="submit" className="addbut">Add Event</button>
      </form><br></br>

       <table  >
            <thead   >
                <tr >
                    <th style={{ whiteSpace: "nowrap" }}>Title</th>
                    <th style={{ whiteSpace: "nowrap" }}>Date</th>
                    <th style={{ whiteSpace: "nowrap" }}>Location</th>
                    <th style={{ whiteSpace: "nowrap" }}>TicketPrice</th>
                    <th style={{ whiteSpace: "nowrap" }}>TotalSeats</th>
                    <th>Image</th>
                    <th>Description</th>
                      <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {events.map((e)=>(
                        <tr key={e._id}>
                          <td style={{ whiteSpace: "nowrap" }}>{e.title}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{e.date}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{e.location}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{e.ticketprice}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{e.totalseats}</td>
                          <td>{e.image}</td>
                          <td>{e.description}</td>
                          <td>
                            <div  style={{ display: "flex", alignItems: "center",gap: "10px", whiteSpace: "nowrap",justifyContent: "center",
    }}>
                            <button onClick={()=>handleEdit(e)}><MdEdit /></button>
                            <button  style={{ color: "red", marginLeft: "8px" }} onClick={()=>handleDelete(e._id)}><MdDelete /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
        </table>
         {editEvent && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await updateEvent(editEvent._id, {
              title: editEvent.title,
              date: editEvent.date,
              location: editEvent.location,
              price: editEvent.price,
              totalSeats: editEvent.totalSeats,
              description: editEvent.description,
            });
            setEditEvent(null);
            loadEvents();
          }}
          style={{ marginTop: "20px" }}
        >
          <h3>Edit Event</h3>

          <input
            value={editEvent.title}
            onChange={(e) =>
              setEditEvent({ ...editEvent, title: e.target.value })
            }
          />

          <input
            type="date"
            value={editEvent.date}
            onChange={(e) =>
              setEditEvent({ ...editEvent, date: e.target.value })
            }
          />

          <input
            value={editEvent.location}
            onChange={(e) =>
              setEditEvent({ ...editEvent, location: e.target.value })
            }
          />

          <input
            type="number"
            value={editEvent.price}
            onChange={(e) =>
              setEditEvent({ ...editEvent, price: e.target.value })
            }
          />

          <input
            type="number"
            value={editEvent.totalSeats}
            onChange={(e) =>
              setEditEvent({ ...editEvent, totalSeats: e.target.value })
            }
          />

          <textarea
            value={editEvent.description}
            onChange={(e) =>
              setEditEvent({ ...editEvent, description: e.target.value })
            }
          />

          <br />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditEvent(null)}>
            Cancel
          </button>
        </form>
      )}
       </div>
    )
}