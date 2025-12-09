'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMusic } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import './navbar.css'
import Link from "next/link";
import { useState,useEffect } from 'react';

export default function Navbar(){

   const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
    const user = localStorage.getItem("username");
    setLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setLoggedIn(false);
  };
    return(
      <>
      <nav className="navbar navbar-light  ">
      <div className="container-fluid ">
      
    <a className="navbar-brand" href="#">
      {/* <FaMusic /> */}
     <h4 style={{color:"white"}}>MusicBook</h4>
    </a>
    <nav className="navbar navbar-light ">
  <div className="container-fluid ">
    <form className="d-flex search">
      <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search"></input>
      <button className="btn btn-outline-light" type="submit"> <FaSearch /></button>
    </form>
  </div>
</nav>
    <ul className="nav justify-content-end top">
  <li className="nav-item">
     <Link href="/" className="nav-link">Home</Link>
  </li>
  <li className="nav-item">
     <Link href="/#about" className="nav-link">About</Link>
  </li>
  <li className="nav-item">
  <Link href="/#artist" className="nav-link">Artist</Link>
  </li>

    {loggedIn ? (
              <>
                <li className="nav-item">
                  <Link href="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link bg-light"
                    style={{ textDecoration: "none" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/signup" className="nav-link">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" className="nav-link">Login</Link>
                </li>
              </>
            )}
  
</ul>
  </div>
  
</nav>


      </>
    )
}