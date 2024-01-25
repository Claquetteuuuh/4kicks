
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const taille = await prisma.taille.findMany();
        if (!taille) {
            res.status(400).json({ error: "Error getting tailles, D-001" })
        }
        res.status(200).json(taille)
    }
}