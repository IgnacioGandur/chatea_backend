import { Prisma } from "../../generated/prisma/client.js";
import type { Request, Response, NextFunction } from "express";

export default function errorsHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    console.error(`${err.name}: ${err.message}`);

    let message: string = "";

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        message = "A Prisma error occurred.";
    }

    return res.status(500).json({
        success: false,
        message: `Internal server error: ${message || "Unknown"}`,
    });
}
