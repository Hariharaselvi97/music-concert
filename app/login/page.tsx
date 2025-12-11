'use client';
import { loginAction } from "../actions/login";
import './login.css'
import { useState,useEffect } from "react";
import { FaEye ,FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";






export default function Login(){

     
    const router = useRouter(); 

//    useEffect(() => {
//     const user = localStorage.getItem("username");

//     if (user) {
//       router.replace("/");   // 🚀 redirect to home
//     }
//   }, []);

    const [message, setMessage] = useState({
 
    email: "",
    password: "",
   
  });
  
  const[showModal,setShowModal]=useState(false)
  const [modalMessage, setModalMessage] = useState({ type: "", text: "" });
  
  

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      ...message,[e.target.name]: e.target.value
    });
  };
     
  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     if ( !message.email || !message.password  ){
      setModalMessage({ type: "error", text: "All fields are required" });
      setShowModal(true);  
      return;
    }
    if (message.password.length < 6) {
      setModalMessage({ type: "error", text: "Password must be at least 6 characters" });
      setShowModal(true);
      return;
    }
   
    const formData = new FormData();
 
    formData.append("email", message.email);
    formData.append("password", message.password);
   

    const res = await loginAction(formData);
    

      
    
        if (res.error) {
      setModalMessage({ type: "error", text: res.error }); 
      setShowModal(true);
    } else if (res.success) {
      setModalMessage({ type: "success", text: "Login successfully!!!" });
      setShowModal(true);
      setMessage({ email: "", password: "" });

      //  setTimeout(() => {
      //  localStorage.setItem("username", res.username || ""); 
      //   localStorage.setItem("email", res.email || "");
      //   router.replace("/"); 
      // }, 1500);

      
       setTimeout(() => {
       localStorage.setItem("username", res.user.name);
       localStorage.setItem("email", res.user.email);
        router.replace("/"); 
      }, 1500);

     

    }
  };

const closeModal=()=> setShowModal(false);


  const[show,setShow]=useState(false);
  const handleClick=()=>{
      setShow(!show)
  }
    return(
        <>
    <div className="outer1">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
     
         <div className="form-floating mb-3">
        <input type="email" className="form-control" id="email" placeholder="Email" name='email' value={message.email} onChange={handleChange}/>
        <label htmlFor="email">Email</label>
        </div>

 <div className="form-floating position-relative mb-3">
      <input type={show ? "text" : "password"} className="form-control"  id="password"  placeholder="Password" name="password"value={message.password || ""}  onChange={handleChange}/>
      <label htmlFor="password" className="form-label">Password</label>
      <span onClick={handleClick} style={{
       position: "absolute",
       top: "50%",
       right: "15px",
       transform: "translateY(-50%)",
       cursor: "pointer",
       color: "white",
       fontSize: "1.2rem",marginRight:"60px"}}>
      {show ? <FaRegEyeSlash /> : <FaEye />}
      </span>
      <div style={{ fontSize: "12px", marginTop: "5px" }}>
      (only 6 characters)
      </div>
      </div>
        <button className="butt" >Login</button><br></br><br></br>
   
<Link href="/signup" className="nav-link last">
  Not yet registered? Signup
</Link> 
<Link href="/admin" className="nav-link last">
  <p>For Adminlogin</p>
</Link>     
</form> 
    </div>
    
    {showModal && (
        <div className="modal show d-block" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body" style={{ color: modalMessage.type === "success" ? "green" : "red", textAlign: "center" }}>
                <h4 style={{ marginTop: "10px" }}>{modalMessage.text}</h4>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
    )}
   
   </> 
    )
}