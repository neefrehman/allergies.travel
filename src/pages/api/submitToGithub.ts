import type { NextApiHandler } from "next";

export type ErrorResponse = { Error: string };

type GithubResponse = { n: number } | ErrorResponse;

const handler: NextApiHandler<GithubResponse> = async (req, res) => {
    if (req.method === "POST") {
        res.status(200).json({ n: Math.random() });
    } else {
        res.status(405).json({ Error: "only POST requests are accepted" });
    }
};

export default handler;
