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
    else if (req.method === "DELETE") {
        const { affiche_uid } = req.headers;
        if (!affiche_uid) {
            res.status(400).json({ error: "affiche uid not specified ! A-001" })
            return;
        }
        const deleted = await prisma.affiche.delete({
            where: {
                affiche_uid: affiche_uid as string
            }
        })
        if (deleted) {
            res.status(200).json({ message: "the affiche has been deleted" });
        } else {
            res.status(400).json({ error: "Error during deleting. A-002" })
        }
    }
}