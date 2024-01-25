
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const color = await prisma.color.findMany();
        if (!color) {
            res.status(400).json({ error: "Error getting colors, D-001" })
        }
        res.status(200).json(color)
    }
}