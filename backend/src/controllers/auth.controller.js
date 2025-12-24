import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createNewUser } from "../models/createDB.queries.js";
import { getUserByEmail, getUserById } from "../models/readDB.queries.js";


// SIGNUP CONTROLLER
async function signUp(req, res) {

    let { email, password, username, firstName, lastName, gender, bio } = req.userDetails;

    try {

        const rounds = Number(process.env.SALT_ROUNDS || 10);
        const password_hash = await bcrypt.hash(password, rounds);

        const profilePic = gender?.toLowerCase() === "male" ? "https://avatar.iran.liara.run/public/41" : "https://avatar.iran.liara.run/public/64";

        await createNewUser(email, password_hash, username, firstName, lastName, bio, profilePic, gender);

        res.status(200).json({ success: true, user: { email, username, firstName, lastName, bio, profilePic, gender } });

    } catch (error) {
        console.log("Errors in Signup controller: ", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}


// LOGIN CONTROLLER
async function login(req, res) {

    const { email, password } = req.userDetails;

    try {

        const existingUsers = await getUserByEmail(email);
        if (existingUsers.length == 0) {
            return res.status(400).json({ message: "Invalid Email or Password." });
        }

        const user = existingUsers[0];

        const isValidPass = await bcrypt.compare(password, user.password_hash)
        if (!isValidPass) {
            return res.status(400).json({ message: "Invalid Email or Password." });
        }

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // Use "secure: true" in production with HTTPS
            sameSite: 'lax',
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ success: true, message: "Login Successful.", data: {user_id: user.user_id} });

    } catch (error) {
        console.log("Errors in Login controller: ", error)
        return res.status(500).json({ message: "Internal Sever Error." });
    }

}

// LOGOUT CONTROLLER
function logout(req, res) {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ success: true, message: "Logout Successful.", user: req.userDetails });
    } catch (error) {
        console.log("Errors in Logout controller: ", error)
        return res.status(500).json({ message: "Internal Sever Error." });
    }
}

async function verify(req, res) {

    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid Token." });
        }

        const users = await getUserById(decoded.userId);
        if (users.length == 0) {
            return res.status(401).json({ message: "Unauthorized: User not found." });
        }

        const user = users[0];

        return res.status(200).json({ success: true, message: "Verified User", data: {user_id: user["user_id"]} });
    } catch (error) {
        console.log("Errors in Verify controller: ", error)
        return res.status(500).json({ message: "Internal Sever Error." });
    }
}

export { signUp, login, logout, verify };