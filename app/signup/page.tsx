'use client';
import { signupAction } from '../actions/signup'
import './signup.css'
import { useState,useEffect } from "react";
import { FaEye ,FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";





export default function Signup(){
     const router = useRouter(); 
  //     useEffect(() => {
  //   const user = localStorage.getItem("username");

  //   if (user) {
  //     router.replace("/");   // 🚀 redirect to home
  //   }
  // }, []);

     const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword:""
  });

   const[showModal,setShowModal]=useState(false)
   const [modalType, setModalType] = useState(""); 
   const [modalMessage, setModalMessage] = useState(""); 

   


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,[e.target.name]: e.target.value
    });
  };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
     

    if (!form.name || !form.email || !form.password || !form.confirmpassword ){
      setModalType("error");
      setModalMessage("All fields are required");
      setShowModal(true);
  
      return;
    }
    if (form.password.length < 6) {
      setModalType("error");
      setModalMessage("Password must be at least 6 characters");
      setShowModal(true);
      return;
    }
    if (form.confirmpassword !== form.password) {
      setModalType("error");
      setModalMessage("Confirm password must match password");
      setShowModal(true);
      return;
    }

      const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("confirmpassword", form.confirmpassword);

    const res = await signupAction(formData);

     if (res.error) {
      setModalType("error");
      setModalMessage(res.error);
      setShowModal(true);
      return;
    }

    if (res.success) {
      setModalType("success");
      setModalMessage(`Hello ${form.name}...,your account has been created!`);
      setShowModal(true);

      setTimeout(() => {
        // localStorage.setItem("username", form.name);
        router.replace("/"); // ✅ replace so login/signup removed from history
      }, 2000);

      setForm({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
      });

        

    }
  };


  const closeModal=()=> setShowModal(false);

  const[show,setShow]=useState(false);
  const handleClick=()=>{
      setShow(!show)
  }
    return(
       <>
    <div className="outer">
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit} >
      
        <div className="form-floating mb-3">
        <input type="text" className="form-control" id="name" placeholder="Name" name='name' value={form.name} onChange={handleChange}/>
        <label htmlFor="name">Name</label>
        </div>


        <div className="form-floating mb-3">
        <input type="email" className="form-control" id="email" placeholder="Email" name='email' value={form.email} onChange={handleChange}/>
        <label htmlFor="email">Email</label>
        </div>
       
       
      <div className="form-floating position-relative mb-3">
      <input type={show ? "text" : "password"} className="form-control"  id="password"  placeholder="Password" name="password"value={form.password || ""}  onChange={handleChange}/>
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

         <div className="form-floating mb-3">
        <input type="password" className="form-control" id="password" placeholder="Confirm Password" name='confirmpassword' value={form.confirmpassword} onChange={handleChange}/>
        <label htmlFor="password">Confirm Password</label>
        </div>

        <button>Create Account</button><br></br><br></br>
         {/* <Nav.Link as={Link} href="/login" className="last1">Already have an account? Login</Nav.Link> */}
      </form>
     
    </div>

   {showModal && (
        <div className="modal show d-block"
          style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-body"
                style={{
                  color: modalType === "success" ? "green" : "red",
                  textAlign: "center"
                }}
              >
                <h5 style={{ marginTop: "10px" }}>{modalMessage}</h5>
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