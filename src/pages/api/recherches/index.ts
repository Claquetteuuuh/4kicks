import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ArticlesType } from "../../../../types/home/Article";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method == "GET") {
        const prisma: PrismaClient = new PrismaClient();

        const rechercheTexte: string | string[] = req.query.motCles as string;

        const recherches = await prisma.product.findMany({
            select: {
                product_uid: true,
                name: true,
                price: true,
                product_image: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                name: {
                    contains: rechercheTexte
                }
            }
        });

        const rechercheReturnes: ArticlesType[] = [];

        recherches.forEach(thisRecherche => {
            const recherche: ArticlesType = {
                productUID: thisRecherche.product_uid,
                nameProduct: thisRecherche.name,
                price: thisRecherche.price,
                imageLien: `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisRecherche.product_image?.name}`
            }
            rechercheReturnes.push(recherche);
        })
        res.status(200).json(rechercheReturnes);
    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" })
    }
}