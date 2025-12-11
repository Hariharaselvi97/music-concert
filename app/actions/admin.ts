"use server";
import { Connectdb } from "@/lib/mongodb";
import {User} from "@/modals/User";
import bcrypt from "bcryptjs";



export async function adminAction(formData: FormData) {
  const name = formData.get("name")?.toString();
  const password = formData.get("password")?.toString();
 
   
  if (!name|| !password ) {
    return { error: "All fields are required" 
      
    };
   
  }
   await Connectdb();

    const hashedPass = await bcrypt.hash(password, 6);
   
     await User.create({
       name,
       password: hashedPass,
      
     });

     return {
    success: true,
    user: {
      name,
      password
    }
  };
}