import passport from "passport";
import { Router } from "express";
import authController from "../controllers/authController.js";
import validateRegister from "../middlewares/validators/validateRegister.js";
import validateLogin from "../middlewares/validators/validateLogin.js";
import onlyAuthenticatedUsers from "../middlewares/onlyAuthenticatedUsers.js";

const authRouter = Router();

authRouter
    .route("/register")
    .post(...validateRegister, authController.register);

authRouter
    .route("/login")
    .post(
        ...validateLogin,
        passport.authenticate("local"),
        authController.login,
    );

authRouter.route("/logout").all(authController.logout);

authRouter
    .route("/protected")
    .all(onlyAuthenticatedUsers, authController.protected);

export default authRouter;
