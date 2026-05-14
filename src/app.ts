import express from "express";
import router from "./routes/router.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.ORIGIN_URL,
    }),
);

app.use(router);

export default app;
