'use client';
import { useState } from 'react';
import './admin.css'
import { adminAction } from '../actions/admin';
import { useRouter } from "next/navigation";




export default function Admin(){
     const router = useRouter(); 
    const[form,setForm]=useState({
        name:"",
        password:""
    })

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
   if (!form.name || !form.password ){
      setModalType("error");
      setModalMessage("All fields are required");
      setShowModal(true);
  
      return;
    }

     const formData = new FormData();
    formData.append("name", form.name);
    formData.append("password", form.password);

      const res = await adminAction(formData);

      
    //  if (res.error) {
    //   setModalType("error");
    //   setModalMessage(res.error);
    //   setShowModal(true);
    //   return;
    // }

     if (res.success) {
      setModalType("success");
      setModalMessage("Admin login successfully");
      setShowModal(true);

      setTimeout(() => {
        router.push("/admindashboard");
      }, 2000);

      setForm({
        name: "",
        password: "",
      
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
            <div className="out">
              <h1>Admin</h1>
              <form onSubmit={handleSubmit} >
              
                <div className="form-floating mb-3">
                <input type="text" className="form-control" id="name" placeholder="Name" name='name' value={form.name} onChange={handleChange}/>
                <label htmlFor="name">Username</label>
                </div>
        
        
               
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder=" Password" name='password' value={form.password} onChange={handleChange}/>
                <label htmlFor="password"> Password</label>
                </div>
        
                <button className='butt1'>Login</button><br></br><br></br>
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
  