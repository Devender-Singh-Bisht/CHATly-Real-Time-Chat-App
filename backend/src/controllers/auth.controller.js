import bcrypt from "bcryptjs";
 import { createNewUser } from "../models/createDB.queries.js";


// SIGNUP CONTROLLER
async function signUp(req, res) {

    let { email, password, username, firstName, lastName, gender, bio } = req.userDetails;

    try {

        const rounds = Number(process.env.SALT_ROUNDS || 10);
        const password_hash = await bcrypt.hash(password, rounds);

        const profilePic =gender?.toLowerCase() === "male"? "https://avatar.iran.liara.run/public/41": "https://avatar.iran.liara.run/public/64";

        await createNewUser(email, password_hash, username, firstName, lastName, bio, profilePic, gender);

        res.status(200).json({ success: true, user: { email, username, firstName, lastName, bio, profilePic, gender } });

    } catch (error) {
        console.log("Errors in Signup controller: ", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}


// LOGIN CONTROLLER
function login(req, res) {

    const {username, password} = 

    res.send("Log in");
}

// LOGOUT CONTROLLER
function logout(req, res) {
    res.send("Log out");
}

export { signUp, login, logout };