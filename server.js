import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";

import cors from "cors";


dotenv.config();
connectDB();


const app = express();

const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://localhost:5173",
  "https://admin-daily-news.vercel.app",
  "https://admin-daily-news.vercel.app/",
  "http://82.25.109.68:3005",
  "http://82.25.109.68:3005/",
  "https://dailynewzmail.com/",
  "https://dailynewzmail.com"

]);

// CORS middleware setup
app.use(
  cors({
    origin: (origin, callback) => {
      // If origin is undefined (like Postman or curl), allow it
      
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        // console.log("Origin:", origin);
      } else {
        console.warn("Blocked CORS request from:", origin);
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true, // Allows cookies and session headers
  })
);



app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);






const PORT = process.env.PORT || 5007;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
