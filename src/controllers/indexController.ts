import type { Request, Response } from "express";

class IndexController {
    index(_req: Request, res: Response) {
        return res.json({
            success: true,
            message: "Index route reached!",
        });
    }
}

export default new IndexController();
