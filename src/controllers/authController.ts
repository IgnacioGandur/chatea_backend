import type { NextFunction, Request, Response } from "express";
import userModel from "../db/user.js";
import bcrypt from "bcryptjs";

class Auth {
    async register(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create(username, hashedPassword);

        req.login(user, function done(error) {
            if (error) {
                return next(error);
            }

            return res.json({
                success: true,
                message:
                    "User registered successfully! You are now logged too.",
                user,
            });
        });
    }

    login(_req: Request, res: Response) {
        return res.json({
            success: true,
            message: "User logged successfully!",
        });
    }

    logout(req: Request, res: Response, next: NextFunction) {
        req.logout(function logoutFunction(error) {
            if (error) {
                return next(error);
            }

            req.session.destroy(function destroyCookieFunction(error) {
                if (error) {
                    return next(error);
                }

                res.clearCookie("connect.sid", {
                    path: "/",
                    httpOnly: true,
                });

                return res.json({
                    success: true,
                    message: "User successfully logged out.",
                });
            });
        });
    }

    protected(_req: Request, res: Response) {
        return res.json({
            success: true,
            message: "Protected route reached! You are authenticated.",
        });
    }
}

export default new Auth();
