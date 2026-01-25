import "./src/config/env.js";

import express from "express";
import { createServer } from "http";
import { Server } from 'socket.io';
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/user.route.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

io.on("connection", (socket) => {
  console.log("User connected")
})

const PORT = process.env.PORT;
httpServer.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My Express app - listening on port ${PORT}!`);
});
