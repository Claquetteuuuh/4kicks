import { NextApiRequest, NextApiResponse } from "next";
import { ProduitType } from "../../../../types/home/Produit";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "your're not authorize to access this route !" });
        return;
    }

    if (req.method === "GET") {

        const userUID: string = req.query.userID as string;
        const finalList: filtre[] = await recuperation_filtre(userUID);

    }
}


async function recuperation_filtre(userUID: string) {
    const prisma: PrismaClient = new PrismaClient();
    const favorisAcount: filtre[] = [];
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
                name: true,
                marque: true,
                product_categorie: {
                    select: {
                        categorie: {
                            select: {
                                categorie_uid: true,
                                name: true
                            }
                        }
                    }
                }
            },
            where: {
                product_uid: favori.product_uid
            }
        });

        produit.forEach(thisProduit => {

            let categorieListe: categorie[] = []
            thisProduit.product_categorie.forEach(thisCategorie => {
                const cat: categorie = {
                    categorie_id: thisCategorie.categorie.categorie_uid,
                    name: thisCategorie.categorie.name
                }
            })

            const product: filtre = {
                name: thisProduit.name,
                categorie: categorieListe,
                marque: thisProduit.marque
            };
            favorisAcount.push(product);
        });
    }));

    return favorisAcount;
}

async function filtreCategorie()


type filtre = {
    categorie: categorie[],
    marque: string
    name: string,
}
type categorie = {
    categorie_id: string,
    name: string
}

