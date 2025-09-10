import express from "express";
import { registration, login, logOut, googleLogin, checkAuth,adminLogin } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration", registration);
authRoutes.post("/login", login);
authRoutes.post("/logout", logOut);
authRoutes.post("/googleLogin", googleLogin);
authRoutes.get("/check", checkAuth);
authRoutes.post("/adminLogin", adminLogin);


export default authRoutes;
