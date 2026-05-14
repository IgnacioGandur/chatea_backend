import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./db/client.js";
import passport from "passport";

const app = express();

app.use(
    cors({
        origin: process.env.ORIGIN_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    expressSession({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            path: "/",
        },
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 1000 * 60 * 2,
            dbRecordIdIsSessionId: false,
        }),
    }),
);

import "./middlewares/passport.js";

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

export default app;
