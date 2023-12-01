import express from "express";
//require("dotenv").config();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();  
const uri="mongodb+srv://luckyaher47513:EINk8yzOe0igZfpN@cluster0.il9arok.mongodb.net/?retryWrites=true&w=majority"
//process.env.SERVER_MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
        console.log("Connected to Mongo");
    } catch (error) {
        console.log("mongodb error:", error.message);
    }
};

connectDB();

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, ()=>{
    
    console.log("Connected to backend.");
    //connect(); // Call the connect function
    
});