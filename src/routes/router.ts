import { Router } from "express";
import indexRouter from "./index.js";
import authRouter from "./authRouter.js";

const router = Router({ mergeParams: true });

router.use("/", indexRouter);
router.use("/auth", authRouter);

export default router;
