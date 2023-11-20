import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method == "GET") {
        const prisma: PrismaClient = new PrismaClient();

        const produits = await prisma.product.findMany({
            select: {
                name: true,
                description: true,
                price: true,
 


            }
        })
    }
}