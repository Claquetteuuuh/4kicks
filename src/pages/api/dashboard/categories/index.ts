import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "GET"){
        const categories = await prisma.categorie.findMany();
        if(!categories){
            res.status(400).json({error: "Error getting categories, D-001"})
        }
        res.status(200).json(categories)
    }
}