
// Login Validations
export function validateLogin(req, res, next) {

    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Invalid Email or Password." });
        }

        email = email.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email or Password." });
        }

        req.userDetails = { email, password };
        next();

    } catch (error) {
        console.log("Errors in Login Validator: ", error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}