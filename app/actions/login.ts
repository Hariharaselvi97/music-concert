"use server";
import { Connectdb } from "@/lib/mongodb";
import {User} from "@/modals/User";
import bcrypt from "bcryptjs";


export async function loginAction(formData: FormData) {
  await Connectdb();

  const email= formData.get("email") as string;
  const password = formData.get("password") as string;

  

  const user = await User.findOne({ email });

  if (!user) {
    return { error: "User does not exist" };
  }
   const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: "Incorrect password" };
  }

  return { success: true , username: user.name || "", email: user.email || ""  };
}


  

 
