import { prisma } from "./client.js";
import { PrismaClient } from "../../generated/prisma/client.js";

class User {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(username: string, password: string) {
        return await this.prisma.user.create({
            data: {
                username,
                password,
            },
        });
    }
}

export default new User(prisma);
