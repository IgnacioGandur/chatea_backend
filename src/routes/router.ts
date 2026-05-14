import { Router } from "express";
import indexRouter from "./index.js";

const router = Router({ mergeParams: true });

router.use("/", indexRouter);

export default router;
