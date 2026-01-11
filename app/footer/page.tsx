
import './footer.css'
import { CgMail } from "react-icons/cg";
import { FaMusic } from "react-icons/fa";
import Link from "next/link";


export default function Footer(){
    return(
       <footer className="music-footer text-light pt-5 pb-4 mt-5" data-aos="fade-up" data-aos-duration="1000">
      <div >
        <div className="row footer-content">

          {/* Brand */}
          <div className="col-md-4 mb-4 fade-up">
          <p style={{color:"yellow",fontSize:"25px",marginTop:"10px",marginLeft:"15px"}}data-aos="fade-right" data-aos-duration="1000"><FaMusic /></p>
              <Link href="/" className="navbar-brand">
                <p style={{marginLeft:"45px",marginTop:"-38px",color:"yellow",fontWeight:"bold"}}data-aos="fade-right" data-aos-duration="1000">MusicBook</p>
              </Link>
            <p style={{marginLeft:"15px",fontSize:"18px"}} data-aos="fade-up" data-aos-duration="1000">
              Experience live concerts with premium seating and seamless booking.
            </p>
          </div>

      
          {/* <div className="col-md-2 mb-4 fade-up delay-1">
            <h6 className="fw-bold">Explore</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/" className="footer-link">About</a></li>
              <li><a href="/" className="footer-link">Artists</a></li>
            </ul>
          </div> */}


          {/* Social */}
          <div className="col-md-3 mb-4 foot">
            <h6 className="fw-bold" style={{color:"yellow",marginTop:"15px"}} data-aos="fade-right" data-aos-duration="1000">Contact Us</h6>
          <p style={{color:"white",fontSize:"20px",marginTop:"10px"}} data-aos="fade-up" data-aos-duration="1000"><CgMail /></p>
              <Link href="/" className="navbar-brand">
                <p style={{marginLeft:"28px",marginTop:"-38px",fontSize:"18px"}} data-aos="fade-up" data-aos-duration="1000">musicbookinfo@gmail.com</p>
              </Link>
          </div>

        </div>
        <hr className="border-secondary" />

        <div className="text-center " >
          © {new Date().getFullYear()} <span>MusicBook</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
    )
}