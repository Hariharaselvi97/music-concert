'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMusic } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import './navbar.css'
import Link from "next/link";
import { useState,useEffect } from 'react';

export default function Navbar(){
    const router = useRouter(); 
   const [loggedIn, setLoggedIn] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [search, setSearch] = useState("");
   const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
  //   useEffect(() => {
  //   const user = localStorage.getItem("username");
  //   setLoggedIn(!!user);
  // }, []);


  //  useEffect(() => {
  //   // Example: fetch events from API
  //   const fetchEvents = async () => {
  //     const res = await fetch("/api/events"); // replace with your API
  //     const data = await res.json();
  //     setEvents(data);
  //   };
  //   fetchEvents();
  // }, []);

  // useEffect(() => {
  //   const term = search.trim().toLowerCase();
  //   if (!term) return setFilteredEvents([]);
  //   const filtered = events.filter(
  //     (event: any) =>
  //       event.title.toLowerCase().includes(term) ||
  //       event.location.toLowerCase().includes(term)
  //   );
  //   setFilteredEvents(filtered);
  // }, [search, events]);

  // const handleSearchClick = () => {
  //   const term = search.trim().toLowerCase();
  //   const filtered = events.filter(
  //     (event: any) =>
  //       event.title.toLowerCase().includes(term) ||
  //       event.location.toLowerCase().includes(term)
  //   );
  //   setFilteredEvents(filtered);
  // };

   useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("username");
      setLoggedIn(!!user);
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setLoggedIn(false);

     setShowModal(true);
     setTimeout(() => {
      setShowModal(false);
      router.replace("/"); // redirect to homepage or login
    }, 1500);
  };

    return(


<>
<nav className="navbar navbar-expand-lg navbar-dark  ">
  <div className="container-fluid">
    <p style={{color:"white",fontSize:"30px",marginTop:"10px"}}><FaMusic /></p>
    <Link href="/" className="navbar-brand">
      <h4 style={{marginLeft:"10px"}}>MusicBook</h4>
    </Link>

    {/* <form className="d-flex search position-relative"  >
        <input className="form-control "style={{ marginRight: "-60px" }}  type="text" placeholder="Search by title or location"   value={search}
        onChange={(e) => setSearch(e.target.value)}  onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault(); // Prevent page reload
            }}/>
        <button className="btn btn-outline-light but" type="button" onClick={handleSearchClick}   ><FaSearch /></button>
      </form>
     {filteredEvents.length > 0 && (
            <div className="search-results position-absolute bg-white shadow p-2" style={{ top: "100%", width: "300px", zIndex: 1000 }}>
              {filteredEvents.map((event: any) => (
                <Link key={event._id} href={`/artist/${event._id}`} className="text-dark d-block p-2 border-bottom">
                  <strong>{event.title}</strong><br />
                  <small>{event.location}</small>
                </Link>
              ))}
            </div>
          )} */}

    {/* Right: Links + Search */}
    <div className="d-flex ms-auto align-items-center" >
      <ul className="navbar-nav d-flex flex-row align-items-center me-3 top ">
        <li className="nav-item mx-2">
          <Link href="/" className="nav-link text-white">Home</Link>
        </li>
        <li className="nav-item mx-2">
          <Link href="/#about" className="nav-link text-white">About</Link>
        </li>
        <li className="nav-item mx-2">
          <Link href="/#artist" className="nav-link text-white">Artist</Link>
        </li>

        {loggedIn ? (
          <>
            <li className="nav-item mx-2 ">
              <Link href="/profile" className="nav-link text-white">Profile</Link>
            </li>
            <li className="nav-item mx-2 ">
              <button
                onClick={handleLogout}
                className="btn btn-link nav-link text-white"
                style={{ textDecoration: "none" , marginLeft: "-15px" ,fontWeight:"bold",fontSize:"18px"}}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mx-2">
              <Link href="/signup" className="nav-link text-white">Signup</Link>
            </li>
            <li className="nav-item mx-2">
              <Link href="/login" className="nav-link text-white">Login</Link>
            </li>
          </>
        )}
      </ul>

   
    </div>
  </div>
</nav>


{showModal && (
         <>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-center p-4">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p style={{fontSize:"25px"}}>Logging out...</p>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
      </>
    )
}