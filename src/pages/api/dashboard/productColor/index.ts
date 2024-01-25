import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        interface MyRequestBody {
            product_uid: string,
            add_color_uid: string,
        }
        const {
            product_uid,
            add_color_uid
        }: MyRequestBody = req.body;

        const product = await prisma.product.findUnique({
            where: {
                product_uid: product_uid
            }
        })

        const color = await prisma.color.findUnique({
            where: {
                color_uid: add_color_uid
            }
        })

        if (color != null && product!= null) {
            const productColors = await prisma.productColors.create({
                data: {
                    color_uid: add_color_uid,
                    product_uid: product_uid
                },

            })
            if (!productColors) {
                res.status(400).json({ error: "Error creating productColors, D-001" })
            }
            res.status(200).json({ message: "productColors créé" })
        }
        else {
            res.status(400).json({ error: "Error color_uid or product_uid not found, D-002" })
        }
    }
    else {
        res.status(400).json({ error: "this route is only POST, D-003" })
    }
}