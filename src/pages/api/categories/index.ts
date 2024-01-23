import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ProduitType } from "../../../../types/home/Produit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;
    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method === "GET") {
        const prisma: PrismaClient = new PrismaClient();

        const categoryName: string | string[] = req.query.category as string;

        const products = await prisma.product.findMany({
            select:{
                price: true,
                name: true,
                product_uid: true,
                description: true,
                product_images:{
                    select:{
                        image: true
                    }
                }
            },
            where:{
                product_categorie:{
                    some:{
                        categorie:{
                            name: categoryName
                        }
                    }
                }
            }
        });

        const categorieReturned: ProduitType[] = [];

        products.forEach(thisProducts => {
            const image: string[] = []

            thisProducts.product_images.forEach(thisImage => {
                const imageProv: string = `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisImage.image.name}`
                image.push(imageProv)
            })


            const categorie: ProduitType = {
                productUID: thisProducts.product_uid,
                nameProduct: thisProducts.name,
                price: thisProducts.price,
                imageLien: image,
                description: thisProducts.description
                
            }
            categorieReturned.push(categorie)
        })
        res.status(200).json(categorieReturned);
    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" })
    }
}