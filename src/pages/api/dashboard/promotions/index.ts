import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const promotion = await prisma.promotionCode.findMany();
        if (!promotion) {
            res.status(400).json({ error: "Error getting promotionCode, P-001" })
        }
        res.status(200).json(promotion)
    }
    else if (req.method === "DELETE") {

        const promo_uid = req.headers["promo_uid"] as string;

        const promotion = await prisma.promotionCode.delete({
            where: {
                promo_uid: promo_uid
            }
        })
        if (!promotion) {
            res.status(400).json({ error: "Error deleting promotionCode, P-002" })
        }
        res.status(200).json(promotion)
    }
    else if (req.method === "POST") {
        interface MyRequestBody {
            new_code: string;
            new_coefficient: string
        }
        const {
            new_code,
            new_coefficient
        }: MyRequestBody = req.body;
        
        const promotion = await prisma.promotionCode.create({
            data: {
                code: new_code,
                coefficient: parseFloat(new_coefficient)
            }
        })

        if (promotion) {
            res.status(200).json({ message: "the promotion code has been created" });
        } else {
            res.status(400).json({ error: "Error during creation. P-003" })
        }

    }
}