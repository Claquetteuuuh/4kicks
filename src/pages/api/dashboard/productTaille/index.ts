import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        interface MyRequestBody {
            product_uid: string,
            add_taille_uid: string,
        }
        const {
            product_uid,
            add_taille_uid
        }: MyRequestBody = req.body;

        const product = await prisma.product.findUnique({
            where: {
                product_uid: product_uid
            }
        })

        const taille = await prisma.taille.findUnique({
            where: {
                taille_uid: add_taille_uid
            }
        })

        if (taille != null && product!= null) {
            const productTaille = await prisma.productTaille.create({
                data: {
                    taille_uid: add_taille_uid,
                    product_uid: product_uid
                },

            })
            if (!productTaille) {
                res.status(400).json({ error: "Error creating productTaille, D-001" })
            }
            res.status(200).json({ message: "productTaille créé" })
        }
        else {
            res.status(400).json({ error: "Error taille_uid or product_uid not found, D-002" })
        }
    }
    else {
        res.status(400).json({ error: "this route is only POST, D-003" })
    }
}