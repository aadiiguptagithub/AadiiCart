import express from "express";
import { submitContact, subscribeNewsletter } from "../controller/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/", submitContact);
contactRouter.post("/newsletter", subscribeNewsletter);

export default contactRouter;