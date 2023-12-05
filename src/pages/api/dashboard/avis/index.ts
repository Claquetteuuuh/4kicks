import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const avis = await prisma.avis.findMany();
        if (!avis) {
            res.status(400).json({ error: "Error getting avis, D-001" })
        }
        res.status(200).json(avis)
    }
    else if (req.method === "DELETE") {
        const { avis_uid } = req.headers;
        console.log(avis_uid)
        if (!avis_uid) {
            res.status(400).json({ error: "avis uid not specified ! A-001" })
            return;
        }
        const deleted = await prisma.avis.delete({
            where: {
                avis_uid: avis_uid as string
            }
        })
        if (deleted) {
            res.status(200).json({ message: "the avis has been deleted" });
        } else {
            res.status(400).json({ error: "Error during deleting. A-002" })
        }
    }
}