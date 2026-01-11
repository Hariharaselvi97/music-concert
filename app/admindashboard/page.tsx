"use client";
import { createEvent, getEvents, deleteEvent ,updateEvent } from "../actions/event";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import './admindashboard.css'
import Link from "next/link";



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
  setEditEvent(event); 
 
};

  const handleDelete = async (id: string) => {
  await deleteEvent(id);
  loadEvents(); 

 
};

    return(
      <>
              <div className='back'> <Link href="/" className='pro'>Back to home</Link></div>

       <div className="ad"  data-aos="fade-up" data-aos-duration="1000">
        <h1>Admin Dashboard</h1>
         <form action={handleCreate}  className="dashin" encType="multipart/form-data">
        <input type="text"name="title" placeholder="Title"  /><br></br><br></br>
        <input type="date"name="date" placeholder="Date" /><br></br><br></br>
        <input type="text"name="location" placeholder="Location" /><br></br><br></br>
        <input type="number"name="totalseats" placeholder="Seats"   /><br></br><br></br>
        <input type="file" name="image" accept="image/*"  />
        <textarea name="description" placeholder="Description" /><br></br><br></br>
        <button type="submit" className="addbut">Add Event</button>
      </form><br></br>

       <table  >
            <thead   >
                <tr >
                    <th style={{ whiteSpace: "nowrap" }}>Title</th>
                    <th style={{ whiteSpace: "nowrap" }}>Date</th>
                    <th style={{ whiteSpace: "nowrap" }}>Location</th>
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
                          <td style={{ whiteSpace: "nowrap" }}>{e.totalseats}</td>
                          <td>{e.image && <img src={e.image} width="80" height="80" style={{ borderRadius: 6 }} />}</td>
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
        <form className="ad1"
          onSubmit={async (e) => {
            e.preventDefault();
            await updateEvent(editEvent._id, {
              title: editEvent.title,
              date: editEvent.date,
              location: editEvent.location,
              // image:editEvent.image,
              totalseats: editEvent.totalseats,
              description: editEvent.description,
            });
            setEditEvent(null);
            loadEvents();
          }}
          style={{ marginTop: "20px" }}
        >
       
          <h3 style={{color:"white",textAlign:"center"}}>Edit Event</h3>

          <input 
            value={editEvent.title}
             placeholder="Title" 
            onChange={(e) =>
              setEditEvent({ ...editEvent, title: e.target.value })
            }
          /><br></br><br></br> 

          <input
            type="date"
             placeholder="Date" 
            value={editEvent.date}
            onChange={(e) =>
              setEditEvent({ ...editEvent, date: e.target.value })
            }
          /><br></br><br></br>

   

          <input
          placeholder="Location"
            value={editEvent.location}
            onChange={(e) =>
              setEditEvent({ ...editEvent, location: e.target.value })
            }
          /><br></br><br></br>


       
          <input
            type="number"
            placeholder="Seats"
            value={editEvent.totalseats}
            onChange={(e) =>
              setEditEvent({ ...editEvent, totalseats: e.target.value })
            }
          /><br></br><br></br>

          


    {/* <input
  type="file"
  onChange={(e) =>
    setEditEvent({
      ...editEvent,
      image: e.target.files?.[0] || null,
    })
  }
/><br></br><br></br>  */}

          <textarea
          name="description"
          placeholder="Description"
            value={editEvent.description}
            onChange={(e) =>
              setEditEvent({ ...editEvent, description: e.target.value })
            }
          /><br></br><br></br>
          <button type="submit" className="up">Update</button>
          <button type="button" onClick={() => setEditEvent(null)} className="up1">
            Cancel
          </button>
        </form>

      )}
       </div>
       </>
    )
}