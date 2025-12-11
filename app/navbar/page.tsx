'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMusic } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import './navbar.css'
import Link from "next/link";
import { useState,useEffect } from 'react';

export default function Navbar(){

   const [loggedIn, setLoggedIn] = useState(false);

  //   useEffect(() => {
  //   const user = localStorage.getItem("username");
  //   setLoggedIn(!!user);
  // }, []);

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
  };
    return(



<nav className="navbar navbar-expand-lg navbar-dark ">
  <div className="container-fluid">
    <p style={{color:"white",fontSize:"30px",marginTop:"10px"}}><FaMusic /></p>
    <Link href="/" className="navbar-brand">
      <h4 style={{marginLeft:"10px"}}>MusicBook</h4>
    </Link>

    <form className="d-flex search  ">
        <input className="form-control "style={{ marginRight: "-60px" }}  type="search" placeholder="Search" />
        <button className="btn btn-outline-light but" type="submit"><FaSearch /></button>
      </form>

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

      {/* Search Box */}
    
      {/* <form className="d-flex search ">
        <input className="form-control me-2" type="search" placeholder="Search" />
        <button className="btn btn-outline-light but" type="submit"><FaSearch /></button>
      </form>
      */}
    </div>
  </div>
</nav>
    )
}