import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { GetCurrentUser, Login, Register } from './Controllers/User.controller.js';

const app = express();
app.use(express.json())
dotenv.config()
app.use(cors())

app.get("/", (req, res) => {
    res.send("Working")
})

app.post('/register',Register)
app.post('/login',Login)
app.post('/getcurrentUser',GetCurrentUser)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected To tatacliq DB")
}).catch((error)=>{
    console.log("Error While Connecting DB",error)
})
app.listen(5006, () => {
    console.log("Server Running On Port Number 5006")
})
