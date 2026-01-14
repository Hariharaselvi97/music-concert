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
      router.replace("/"); 
    }, 1500);
  };

    return(


<>


<nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
   <div className="d-flex align-items-center"data-aos="fade-up" data-aos-duration="1000">
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
            <li className="nav-item mx-2" data-aos="fade-up" data-aos-duration="1000">
              <Link href="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item mx-2" data-aos="fade-up" data-aos-duration="1000">
              <Link href="/#about" className="nav-link text-white">About</Link>
            </li>
            <li className="nav-item mx-2" data-aos="fade-up" data-aos-duration="1000">
              <Link href="/#artist" className="nav-link text-white">Artist</Link>
            </li>

            {loggedIn ? (
              <>
                <li className="nav-item mx-2" data-aos="fade-up" data-aos-duration="1000">
                  <Link href="/profile" className="nav-link text-white">Profile</Link>
                </li>
                <li className="nav-item mx-2 " >
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link text-white  "
                     style={{ fontWeight:"bold",fontSize:"18px",marginLeft:"-10px"}}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2" data-aos="fade-up" data-aos-duration="1000">
                  <Link href="/signup" className="nav-link text-white">Signup</Link>
                </li>
                <li className="nav-item mx-2" data-aos="fade-up" data-aos-duration="1000">
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