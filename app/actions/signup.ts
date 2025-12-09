"use server";
import { Connectdb } from "@/lib/mongodb";
import {User} from "@/modals/User";
import bcrypt from "bcryptjs";


export async function signupAction(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmpassword = formData.get("confirmpassword")?.toString();

  
  if (!name || !email || !password ||! confirmpassword) {
    return { error: "All fields are required" 
      
    };
   
  }
    await Connectdb();

  const userExists = await User.findOne({ email });

  if (userExists) 
   
    return {error: "User already exists"
       
    
  };
  
 

  const hashedPass = await bcrypt.hash(password, 6);

  await User.create({
    name,
    email,
    password: hashedPass,
    confirmpassword: hashedPass,
  });

  return { success: true  };
}