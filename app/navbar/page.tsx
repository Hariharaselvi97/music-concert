'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMusic } from "react-icons/fa";
import './navbar.css'

export default function Navbar(){
    return(
      <>
      <nav className="navbar navbar-light  ">
      <div className="container-fluid ">
      
    <a className="navbar-brand" href="#">
      {/* <FaMusic /> */}
     <h4>MusicBook</h4>
    </a>
    <nav className="navbar navbar-light ">
  <div className="container-fluid ">
    <form className="d-flex search">
      <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search"></input>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
    <ul className="nav justify-content-end top">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">About</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Artist</a>
  </li>
   <li className="nav-item">
    <a className="nav-link" href="#">Signup</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Login</a>
  </li>
  
</ul>
  </div>
  
</nav>


      </>
    )
}