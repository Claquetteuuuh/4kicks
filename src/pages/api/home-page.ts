import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export async function handler(req: NextApiRequest , res: NextApiResponse){

    const prisma = new PrismaClient();
    

    const d_affiche = await prisma.affiche.findMany();
    console.log(d_affiche);
}
