import { getEvents } from "../actions/event";
import Link from "next/link";
import './artist.css'
import { getTicketsSoldForEvent } from "../actions/adminstatus" ;




export default async function Artist(){
    const events = await getEvents();

    
  const eventsWithTickets = await Promise.all(
    events.map(async (e: any) => {
      const ticketsSold = await getTicketsSoldForEvent(e._id);
      return { ...e, ticketsSold };
    })
  );

  const totalTickets = 100; 


    return(
      
      <div className="container my-4" id="artist">
  <h1 className="art" data-aos="fade-right" data-aos-duration="1000"> Upcoming Concerts</h1><br></br><br></br>

  <div className="row">
    {eventsWithTickets.map((e: any) => (
      <div key={e._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card h-100 shadow-sm border-0 concert-card" data-aos="flip-left" data-aos-duration="1000">

          <img
            src={e.image || "/concert-placeholder.jpg"}
            className="card-img-top"
            alt={e.title}
            style={{width: "100%",  height: "220px", objectFit: "cover" }}/>

          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold color-white">{e.title}</h5>
             <p className="card-text  mb-1 text-white" >📍 {e.location}</p>

            <p className="card-text text-white mb-2">
              📅 {new Date(e.date).toDateString()}
            </p>
          
                <p className="card-text blinking-text mb-1">
                  🎟  Tickets sold: {e.ticketsSold} / {totalTickets} 
                </p>
             
           
                {/* <div className="progress mb-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${(e.ticketsSold / totalTickets) * 100}%`,
                    }}
                  >
                    {Math.round((e.ticketsSold / totalTickets) * 100)}%
                  </div>
                </div> */}


           
      <Link
  href={`/booking?eventId=${e._id}&title=${e.title}&date=${e.date}`}
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