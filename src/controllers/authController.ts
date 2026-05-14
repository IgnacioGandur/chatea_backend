import type { Request, Response } from "express";
import userModel from "../db/user.js";
import bcrypt from "bcryptjs";

class Auth {
    async register(req: Request, res: Response) {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create(username, hashedPassword);

        return res.json({
            success: true,
            message: "User registered successfully!",
            user,
        });
    }
}

export default new Auth();
