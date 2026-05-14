import type { Request, Response } from "express";
import userModel from "../db/user.js";

class Auth {
    async register(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await userModel.create(username, password);

        return res.json({
            success: true,
            message: "User registered successfully!",
            user,
        });
    }
}

export default new Auth();
