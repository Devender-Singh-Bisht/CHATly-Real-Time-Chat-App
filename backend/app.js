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

initSocket(httpServer);

app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`My Express app - listening on port ${PORT}!`);
});