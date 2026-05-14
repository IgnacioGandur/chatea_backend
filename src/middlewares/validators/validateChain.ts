import type { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";

export default function validateChain(validationChain: ValidationChain[]) {
    return [
        validationChain,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    success: false,
                    message:
                        "Validation errors, something is wrong with the inputs you provided, please correct them:",
                    errors: errors.array(),
                });
            }

            return next();
        },
    ];
}
