
import { getEvents } from "../actions/event";
import './artist.css'







export default async function Artist(){
    const events = await getEvents();


    return(
        <div id="artist">
            <h2>Upcoming Concerts</h2>
              {events.map((e: any) => (
        <div key={e._id}>
          {/* <img src={e.image} width={200} /> */}
          <h3>{e.title}</h3>
          <p>{e.location} | {e.date}</p>
          <p>₹{e.ticketprice}</p>
          {/* <p>
            Available Seats: {e.totalSeats - e.soldSeats}
          </p> */}
        </div>
      ))}
        </div>
    )
}