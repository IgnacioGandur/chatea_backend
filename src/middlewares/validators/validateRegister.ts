import { body } from "express-validator";
import validateChain from "./validateChain.js";
import checkIfUsernameIsAlreadyTaken from "./custom-validators/checkIfUsernameIsAlreadyTaken.js";

export const regex = /^[\w.-]{3,30}$/;

const chain = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username can't be empty.")
        .isLength({ min: 3, max: 30 })
        .withMessage("Username should be between 3 and 30 characters max.")
        .matches(regex)
        .withMessage("Username can only contain letters, numbers and hyphens.")
        .bail()
        .custom(checkIfUsernameIsAlreadyTaken),
];

const validateUserRegister = validateChain(chain);

export default validateUserRegister;
