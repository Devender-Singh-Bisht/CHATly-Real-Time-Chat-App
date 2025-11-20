import { getUserByEmail, getUserByUsername } from "../models/readDB.queries.js";

// SIGNUP Validation Middleware
export async function validateSignUp(req, res, next) {

    let { email, password, confirmPassword, username, firstName, lastName, gender, bio } = req.body;

    try {
        
        if (!email || !password || !confirmPassword || !username || !firstName || !gender) {
            return res.status(400).json({ message: "Please, fill all the required fields. That includes email, password, confirmPassword, username, firstName, gender." });
        }

        email = email?.trim();
        username = username?.trim().toLowerCase();
        firstName = firstName?.trim();
        lastName = (typeof lastName == "undefined") ? "" : lastName;
        lastName = lastName?.trim();
        gender = gender?.trim().toLowerCase();
        bio = bio?.trim();
        bio = (typeof bio == "undefined") ? "" : bio;
        firstName = firstName[0].toUpperCase() + firstName.slice(1);


        //Email Validations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email format." });
        }

        const existingEmail = await getUserByEmail(email);
        if (existingEmail.length != 0) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Password Validations
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#^_-])[A-Za-z\d@$!%*?&.#^_-]{8,32}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be 8–32 characters and include uppercase, lowercase, number, and special character." });
        }

        // Confirm password validation
        if (password != confirmPassword) {
            return res.status(400).json({ message: "Password and Confirmation Password does not matched." });
        }

        // Username Validations
        const usernameRegex = /^(?=.{3,20}$)[a-z][a-z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Username should only contain letters, numbers and underscore and should start with letter only." });
        }

        const existingUser = await getUserByUsername(username)
        if (existingUser.length != 0) {
            return res.status(400).json({ message: "User with this username already exists." });
        }

        // FirstName Validatations
        if (firstName.length < 2) {
            return res.status(400).json({ message: "Firstname should consist more than 2 characters." });
        }

        // Gender validations
        const genders = ["male", "female"]
        if (!genders.includes(gender)) {
            return res.status(400).json({ message: "Invalid Gender." });
        }

        req.userDetails = { email, password, username, firstName, lastName, gender, bio };
        next();

    } catch (error) {
        console.log("Errors in Signup controller: ", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}