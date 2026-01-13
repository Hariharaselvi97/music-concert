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

     const [open, setOpen] = useState(false);

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
  

    useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
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
{/* <nav className="navbar navbar-expand-lg navbar-dark  ">
  <div className="container-fluid">
    <p style={{color:"white",fontSize:"30px",marginTop:"10px"}} data-aos="fade-up" data-aos-duration="1000"><FaMusic /></p>
    <Link href="/" className="navbar-brand">
      <h4 style={{marginLeft:"10px"}} data-aos="fade-up" data-aos-duration="1000">MusicBook</h4>
    </Link>

   
    <div className="d-flex ms-auto align-items-center" data-aos="fade-up" data-aos-duration="1000">
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
</nav> */}

<nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
   <div className="d-flex align-items-center">
  <p style={{ color:"white", fontSize:"30px", margin: 0 }}>
    <FaMusic />
  </p>

  <Link href="/" className="navbar-brand ms-2">
    <span style={{ margin: 0 ,fontSize:"25px"}}>MusicBook</span>
  </Link>
</div>

   
   <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>


  
     <div className={`navbar-collapse ${open ? "d-block" : "d-none"} d-lg-flex`}>
          <ul className="navbar-nav ms-auto text-center top">
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
                <li className="nav-item mx-2">
                  <Link href="/profile" className="nav-link text-white">Profile</Link>
                </li>
                <li className="nav-item mx-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link text-white"
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