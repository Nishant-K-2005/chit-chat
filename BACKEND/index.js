import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // MUST match your frontend URL exactly
  credentials: true,               // MUST be true to allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
}));
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Server is Running Successfully");
});

app.use("/api/auth",authRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
}); 