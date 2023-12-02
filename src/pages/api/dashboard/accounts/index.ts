import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const comptes = await prisma.account.findMany();
        if(!comptes){
            res.status(400).json({error: "Error getting accounts, A-001"})
        }
        res.status(200).json(comptes)
    } else if (req.method === "DELETE") {
        const { account_uid } = req.headers;
        if (!account_uid) {
            res.status(400).json({ error: "account uid not specified ! A-001" })
            return;
        }
        console.log(account_uid)
        const avis = await prisma.avis.findMany({
            select: {
                avis_uid: true
            },
            where: {
                account_uid: account_uid as string
            }
        })
        avis.forEach(thisAvis => {
            console.log("avis : " +thisAvis.avis_uid)
            supressionAvis(thisAvis.avis_uid)
            
           
        })
        const deletedAccount = await prisma.account.delete({
            where: {
                account_uid: account_uid as string
            }
        })

        if (deletedAccount) {
            res.status(200).json({ message: "the account has been deleted" });
        } else {
            res.status(400).json({ error: "Error during deleting. A-002" })
        }
    }
}
async function supressionAvis(avisUID : string){
    const deleteAvis = await prisma.avis.delete({
        where: {
            avis_uid: avisUID as string
        }
        
    });
}