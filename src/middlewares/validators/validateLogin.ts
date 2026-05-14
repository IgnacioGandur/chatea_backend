import bcrypt from "bcryptjs";
import { body } from "express-validator";
import validateChain from "./validateChain.js";
import checkIfUserExists from "./custom-validators/checkIfUserExists.js";

const chain = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username can't be empty.")
        .bail()
        .custom(checkIfUserExists),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password can't be empty.")
        .bail()
        .custom(async function checkIfPasswordIsCorrect(password, { req }) {
            const isPasswordCorrect = await bcrypt.compare(
                password,
                req.foundUser.password, // 'foundUser' is attached in the 'checkIfUserExists' custom validator.
            );

            if (!isPasswordCorrect) {
                throw new Error("Password is not correct.");
            }

            return true;
        }),
];

const validateLogin = validateChain(chain);

export default validateLogin;
