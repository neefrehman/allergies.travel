import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse): any => {
    if (req.method === "POST") {
        res.status(200).json({ randomNumber: Math.random() });
    } else {
        res.status(405).json({ Error: "only POST requests are accepted" });
    }
};
