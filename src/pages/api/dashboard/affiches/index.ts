import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const affiches = await prisma.affiche.findMany();
        if (!affiches) {
            res.status(400).json({ error: "Error getting affiches, D-001" })
        }
        res.status(200).json(affiches)
    }
}