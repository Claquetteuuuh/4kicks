import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ArticlesType } from "../../../../types/home/Article"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method === "GET") {
        const prisma: PrismaClient = new PrismaClient();

        const categoryName: string | string[] = req.query.category as string;

        const categories = await prisma.categorie.findMany({
            select: {
                product_categorie: {
                    select: {
                        product_uid: true,
                        product: {
                            select: {
                                name: true,
                                price: true,
                                product_image: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },

            },
            where: {
                name: categoryName
            }
        });

        const categorieReturned: ArticlesType[] = [];

        categories.forEach(thisCategorie => {
            const categorie: ArticlesType = {
                productUID: thisCategorie.product_categorie[0].product_uid,
                nameProduct: thisCategorie.product_categorie[0].product.name,
                price: thisCategorie.product_categorie[0].product.price,
                imageLien: `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisCategorie.product_categorie[0].product.product_image?.name}`

            }
            categorieReturned.push(categorie)
        })
        res.status(200).json(categorieReturned);
    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" })
    }
}