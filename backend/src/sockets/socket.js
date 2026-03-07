import jwt from "jsonwebtoken";
import { Server } from 'socket.io';
import cookieParser from "cookie-parser";


let io;
const parseCookies = cookieParser();

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: [process.env.CLIENT_URL],
      credentials: true
    }
  });

  io.use((socket, next) => {

    parseCookies(socket.request, {}, () => {

      const token = socket.request.cookies?.jwt;

      if (!token) {
        return next(new Error("Unauthorized: No token provided"));
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        socket.user = decoded;
        next();
      } catch (err) {
        next(new Error("Unauthorized: Invalid token"));
      }

    });
  });

  io.on("connection", (socket) => {
    console.log("User connected:");

    const userId = socket.user.userId;
    socket.join(`user: ${userId}`);

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};