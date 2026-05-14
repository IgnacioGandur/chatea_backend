import type { Meta } from "express-validator";
import userModel from "../../../db/user.js";

export default async function checkIfUserExists(
    username: string,
    { req }: Meta,
) {
    const user = await userModel.get(username);

    if (!user) {
        throw new Error(`User: '${username}' doesn't exist.`);
    }

    req.foundUser = user;
    return true;
}
