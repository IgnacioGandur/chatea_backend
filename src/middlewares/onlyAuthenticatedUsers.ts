import type { NextFunction, Request, Response } from "express";

export default function onlyAuthenticatedUsers(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const isAuthenticated = req.isAuthenticated();

    if (!isAuthenticated) {
        return res.status(401).json({
            success: false,
            message:
                "Protected route. Only authorized users can access this route.",
        });
    }

    return next();
}
