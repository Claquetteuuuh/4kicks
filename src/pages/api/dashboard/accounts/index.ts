import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "GET"){
        const comptes = await prisma.account.findMany();
        if(!comptes){
            res.status(400).json({error: "Error getting categories, D-001"})
        }
        res.status(200).json(comptes)
    }else if(req.method === "DELETE"){
        const { account_uid } = req.headers;
        if(!account_uid){
            res.status(400).json({error: "account uid not specified ! A-001"})
            return;
        }
        const deleted = await prisma.account.delete({
            where: {
                account_uid: account_uid as string
            }
        })
        if(deleted){
            res.status(200).json({message: "the account has been deleted"});
        }else{
            res.status(400).json({error: "Error during deleting. A-002"})
        }
    }
}