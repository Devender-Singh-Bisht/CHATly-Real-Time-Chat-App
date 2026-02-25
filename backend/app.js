import "./src/config/env.js";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initSocket } from "./src/sockets/socket.js";
import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/user.route.js";

const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

app.use(cors({
  origin: ["http://localhost:5173", "http://10.208.116.142:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`My Express app - listening on port ${PORT}!`);
});