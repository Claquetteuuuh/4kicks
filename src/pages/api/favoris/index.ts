import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { FullProductType } from "../../../../types/product/Product";
import { ProduitType } from "../../../../types/home/Produit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "your're not authorize to access this route !" })
        return;
    }

    if (req.method === "GET") {

        const userUID: string = req.query.userID as string;
        const favorisAcount: ProduitType[] = [];

        const temp = await parcourProduct(userUID)

        if (temp) {
            res.status(200).json(temp);
        }
    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" })
    }

}
async function parcourProduct(userUID: string) {
    const prisma: PrismaClient = new PrismaClient();
    const favorisAcount: ProduitType[] = [];
    const favoris = await prisma.favorite.findMany({
        select: {
            product_uid: true
        },
        where: {
            account_uid: userUID
        }
    });


    await Promise.all(favoris.map(async (favori) => {
        const produit = await prisma.product.findMany({
            select: {
                product_uid: true,
                name: true,
                price: true,
                complete_description: true,
                product_images: {
                    select: {
                        image: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
            },
            where: {
                product_uid: favori.product_uid
            }
        });

        produit.forEach(thisProduit => {
            const image: string[] = [];
            thisProduit.product_images.forEach(thisImage => {
                const img: string = `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisImage?.image.name}`;
                image.push(img);
            });

            const product: ProduitType = {
                productUID: thisProduit.product_uid,
                nameProduct: thisProduit.name,
                price: thisProduit.price,
                description: thisProduit.complete_description,
                imageLien: image
            };
            favorisAcount.push(product);
        });
    }));

    // Close the Prisma client connection
    await prisma.$disconnect();

    return favorisAcount;
}