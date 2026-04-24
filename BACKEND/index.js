import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import http from 'http'
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js"
import conversationRouter from "./routes/conversationRoutes.js"
import messageRouter from "./routes/messageRoutes.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // MUST match your frontend URL exactly
  credentials: true,               // MUST be true to allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
}));

const server = http.createServer(app)
initSocket(server);

app.use(express.json());
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Server is Running Successfully");
});

app.use("/api/auth",authRouter)
app.use("/api/conversation",conversationRouter)
app.use("/api/message",messageRouter)

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
}); 