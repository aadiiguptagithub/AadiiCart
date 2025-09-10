import express from "express";
import isAuth from "../midlleware/isAuth.js";
import { getCurrentUser } from "../controller/userController.js";

let UserRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.get("/getadmin", adminAuth, getAdmin);


export default userRouter;
