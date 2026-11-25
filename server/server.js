import 'dotenv/config';
import express from 'express'
import { connectDB } from './config/db.js';
import authRoutes from "./routes/authRoutes.js"
import cors from "cors";



// create and configure a startup express application
const app = express();
const PORT = process.env.RUNNINGPORT || 8000;

app.use(cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));


app.use(express.json());
// this route handles all authentification and authorization
app.use("/api/auth", authRoutes);

// test home route
app.get("/", (req, res) => res.json("Helloooo"));
app.get("/about", (req, res) => res.json("This is the about endpoint."));
app.get("/services", (req, res) => {
    res.send("<h1> Hello API Endpoint</h1> <p> Welcome to the server side. </p>")
})
app.get("/users", (req, res) => res.json("Users loading..."))

   // connect to the MONGODB Database
   await connectDB(process.env.MONGODB_URI);

app.listen(PORT, () => {
   console.log(`SERVER is running on http://localhost:${PORT}`)


})

 