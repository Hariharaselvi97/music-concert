import { getEvents } from "../actions/event";
import Link from "next/link";
import './artist.css'





export default async function Artist(){
    const events = await getEvents();


    return(
      
      <div className="container my-4" id="artist">
  <h1 className="art"> Upcoming Concerts</h1><br></br><br></br>

  <div className="row">
    {events.map((e: any) => (
      <div key={e._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card h-100 shadow-sm border-0 concert-card">

          <img
            src={e.image || "/concert-placeholder.jpg"}
            className="card-img-top"
            alt={e.title}
            style={{ height: "220px", objectFit: "cover" }}/>

          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold color-white">{e.title}</h5>
             <p className="card-text  mb-1 text-white" >📍 {e.location}</p>

            <p className="card-text text-white mb-2">
              📅 {new Date(e.date).toDateString()}
            </p>

            {/* <p className="fw-bold text-white fs-5 mt-auto">
              ₹{e.ticketprice}
            </p> */}

          {/* <Link href="/booking" className="nav-link book">
          Book Now
          </Link> */}
      <Link
  href={`/booking?title=${e.title}&date=${e.date}`}
  className="nav-link book"
>
  Book Now
</Link>
          </div>
        </div>
      </div>
    ))}  

  </div>
</div>
    )
}