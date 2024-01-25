import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        interface MyRequestBody {
            product_uid: string,
            add_categorie_uid: string,
        }
        const {
            product_uid,
            add_categorie_uid
        }: MyRequestBody = req.body;

        const product = await prisma.product.findUnique({
            where: {
                product_uid: product_uid
            }
        })

        const categorie = await prisma.categorie.findUnique({
            where: {
                categorie_uid: add_categorie_uid
            }
        })

        if (categorie != null && product!= null) {
            const productCategorie = await prisma.productCategories.create({
                data: {
                    categorie_uid: add_categorie_uid,
                    product_uid: product_uid
                },

            })
            if (!productCategorie) {
                res.status(400).json({ error: "Error creating productCategorie, D-001" })
            }
            res.status(200).json({ message: "productCategorie créé" })
        }
        else {
            res.status(400).json({ error: "Error categorie_uid or product_uid not found, D-002" })
        }
    }
    else {
        res.status(400).json({ error: "this route is only POST, D-003" })
    }
}