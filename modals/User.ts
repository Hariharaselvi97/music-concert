import mongoose, { Schema, model, models } from "mongoose";
const userSchema = new Schema({
  name: {type:String},
  email: { type: String, unique: true },
  password: {type:String}
});

export const User = models.User || model("User", userSchema ,"users");