import type { Request, Response } from "express";

const indexController = {
    get: async (_req: Request, res: Response) => {
        return res.json({
            success: true,
            message: "Index route reached!",
        });
    },
};

export default indexController;
