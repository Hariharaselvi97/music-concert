import './about.css'




export default function About(){
    return(
//        <section id="about" className="about py-5 text-center">
//    <div className="container">
//     <div className="row justify-content-center">
//       <div className="col-12 col-md-10 col-lg-8 abo">
//         <h1 
//           className="fw-bold mb-3"
//           data-aos="fade-right" 
//           data-aos-duration="1000"
//            style={{marginLeft:"-180px"}}
//         >
//           About
//         </h1>
//         <p 
//           className="mb-3"
//           data-aos="fade-up" 
//           data-aos-duration="1000"
//           style={{marginLeft:"-140px"}}
//         >
//           MusicBook is your ultimate platform for discovering and booking the 
//           best music concerts around you. We bring artists, bands, and music lovers 
//           together on one stage. Enjoy seamless ticket booking, event updates, 
//           and unforgettable concert experiences.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>


<section id="about" className="about py-5 text-center text-md-start">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        <h1 
          className="fw-bold mb-3 text-center text-white"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          About
        </h1>

        <p 
          className="mb-3 text-center text-white"
          data-aos="fade-up"
          data-aos-duration="1000"
        style={{fontFamily:"Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",fontSize:"24px",marginTop:"40px"}}>
          MusicBook is your ultimate platform for discovering and booking the 
          best music concerts around you. We bring artists, bands, and music lovers 
          together on one stage. Enjoy seamless ticket booking, event updates, 
          and unforgettable concert experiences.
        </p>
      </div>
    </div>
  </div>
</section>

    )
}