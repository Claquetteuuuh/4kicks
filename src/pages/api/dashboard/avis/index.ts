import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AvisType } from "../../../../../types/dashboard/AvisType";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const data = await prisma.avis.findMany({
            select:{
                avis_uid: true,
                notation: true,
                content: true,
                creation_date: true,

                account: {
                    select:{
                        username: true
                    }
                }
            }
        });

        const avis: AvisType[] = data.map(av => ({
            avis_uid: av.avis_uid,
            notation: av.notation,
            content: av.content,
            creation_date: av.creation_date,
            user_name: av.account.username,
        }));

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