import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { METHODS } from "http";
import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/bucket";
import { v4 as uuidv4 } from 'uuid';
import { ProductImages } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const products = await prisma.product.findMany();
        if (!products) {
            res.status(400).json({ error: "Error getting products, P-003" })
        }
        res.status(200).json(products)
    } else if (req.method === "DELETE") {
        const product_uid = req.headers["product_uid"] as string;

        console.log("testttttt " + product_uid)
        if (!product_uid) {
            res.status(400).json({ error: "product uid not specified ! P-001" })
            return;
        }
        const deletedProductImage = await prisma.productImages.deleteMany({
            where: {
                product_uid: product_uid
            }
        })
        if (deletedProductImage) {
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
        else {
            res.status(400).json({ error: "Error during deleting. P-002" })
        }

    }
}
