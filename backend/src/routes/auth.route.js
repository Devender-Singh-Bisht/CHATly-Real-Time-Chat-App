import express from "express";
import { validateSignUp } from "../middlewares/signupvalidations.js";
import { signUp, login, logout } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", validateSignUp, signUp);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;