import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import suppressionImages from "../commun/suppressionImages";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const products = await prisma.product.findMany();
        if (!products) {
            res.status(400).json({ error: "Error getting products, P-003" })
        }
        res.status(200).json(products)
    } else if (req.method === "DELETE") {
        const product_uid = req.headers["product_uid"] as string;

        if (!product_uid) {
            res.status(400).json({ error: "product uid not specified ! P-001" })
            return;
        }
        // Recuperation des images
        const images = await prisma.image.findMany({
            select: {
                image_uid: true,
                name: true
            },
            where: {
                product_images: {
                    some: {
                        product_uid: product_uid
                    }
                }
            }

        })

        //suppression du product image
        const deletedProductImage = await prisma.productImages.deleteMany({
            where: {
                product_uid: product_uid
            }
        })
        if (deletedProductImage) {

            //suppression des images dans la bd et dans le buckets
            if (suppressionImages(images)) {
                const deleted = await prisma.product.delete({
                    where: {
                        product_uid: product_uid
                    }
                })
                if (deleted) {
                    res.status(200).json({ message: "the product has been deleted" });
                } else {
                    res.status(400).json({ error: "Error during deleting. P-002" })
                }
            }
            else{
                res.status(400).json({ error: "Error during deleting. P-002" })
            }
        }
        else {
            res.status(400).json({ error: "Error during deleting. P-002" })
        }

    }
}
