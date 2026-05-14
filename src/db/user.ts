import prisma from "./client.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import type { User as UserType } from "../../generated/prisma/client.js";

class User {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(username: string, password: string): Promise<UserType>;
    async create(username: string, password: string) {
        return await this.prisma.user.create({
            data: {
                username,
                password,
            },
        });
    }

    async get(username: string): Promise<UserType | null>;
    async get(username: number): Promise<UserType | null>;
    async get(usernameOrId: string | number) {
        const where =
            typeof usernameOrId === "number"
                ? { id: usernameOrId }
                : { username: usernameOrId };

        return await this.prisma.user.findUnique({
            where,
        });
    }
}

export default new User(prisma);
