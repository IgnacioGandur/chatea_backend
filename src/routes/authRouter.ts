import { Router } from "express";
import authController from "../controllers/authController.js";
import validateUserRegister from "../middlewares/validators/validateUserRegister.js";

const authRouter = Router();

authRouter
    .route("/register")
    .post(...validateUserRegister, authController.register);

export default authRouter;
