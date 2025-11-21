import express from "express";
import { validateSignUp } from "../middlewares/signupvalidations.js";
import { signUp, login, logout } from "../controllers/auth.controller.js";
import { validateLogin } from "../middlewares/loginValidations.js";

const authRouter = express.Router();

authRouter.post("/signup", validateSignUp, signUp);

authRouter.post("/login", validateLogin, login);

authRouter.post("/logout", logout);

export default authRouter;