import dotenv from "dotenv";
import mongoose from "mongoose";

export const connectDB = ():void=>{
    dotenv.config();

    mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
}

