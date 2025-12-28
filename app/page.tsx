import Navbar from "./navbar/page";
import Home from "./home/page";
import About from "./about/page";
import Artist from "./artist/page"
import Footer from "./footer/page"
export default function MainHome() {
  return (
    <div>
      <Navbar/>
      <Home/>
      <About/>
      <Artist/>
      <Footer/>
    </div>
    
  );
}
