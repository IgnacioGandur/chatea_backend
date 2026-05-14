import type { User } from "../../../generated/prisma/client.ts";

declare global {
    namespace Express {
        interface Request {
            foundUser?: User;
        }
    }
}

export {};
