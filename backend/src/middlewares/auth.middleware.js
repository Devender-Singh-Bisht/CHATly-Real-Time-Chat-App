import jwt from "jsonwebtoken";
import { getUserById } from "../models/readDB.queries.js";



export async function authenticate(req, res, next) {

    try {

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const users = await getUserById(decoded.userId);
        if (users.length == 0) {
            return res.status(401).json({ message: "Unauthorized: User not found." });
        }

        const { password_hash, ...user } = users[0];
        req.userDetails = user;
        next();

    } catch (error) {
        console.log("Errors in Authentication Middleware: ", error)
        return res.status(500).json({ message: "Internal Sever Error." });
    }
}