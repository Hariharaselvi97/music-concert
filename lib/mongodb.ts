import mongoose from "mongoose";



export const Connectdb = async()=>{
   try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

  
        await mongoose.connect(process.env.Mongo_URL!);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
