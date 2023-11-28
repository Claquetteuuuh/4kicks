import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ProduitType } from "../../../../types/home/Produit";
import { AvisType } from "../../../../types/home/Avis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method == "GET") {
        const prisma: PrismaClient = new PrismaClient();

        const uidProduit: string | string[] = req.query.uid as string;

        const produits = await prisma.product.findMany({
            select: {
                product_uid: true,
                name: true,
                description: true,
                price: true,
                product_images: {
                    select: {
                        image:{
                            select:{
                                name: true
                            }
                        }
                    }
                },
                product_color: {
                    select: {
                        color: {
                            select: {
                                value: true
                            }
                        }
                    }
                },

                product_taille: {
                    select: {
                        taille: {
                            select: {
                                value: true
                            }
                        }
                    }
                },

                avis: {
                    select: {
                        avis_uid: true,
                        notation: true,
                        content: true,
                        creation_date: true,
                        account: {
                            select: {
                                username: true
                            }
                        }

                    }
                }
            },
            where: {
                product_uid: uidProduit
            }
        })

        const produitReturned: ProduitType[] = [];

        produits.forEach(thisProduit => {

            const avis: AvisType[] = [];
            let moyenne: number = 0;

            thisProduit.avis.forEach(thisAvis => {
                const avi: AvisType = {
                    avisUID: thisAvis?.avis_uid,
                    notation: thisAvis?.notation,
                    content: thisAvis?.content,
                    creationDate: thisAvis?.creation_date,
                    userName: thisAvis?.account.username
                }
                moyenne += thisAvis.notation;
                avis.push(avi);
            })


            if (moyenne != 0) {
                moyenne = moyenne / thisProduit.avis.length
            }

            const image: string[] = []
            thisProduit.product_images.forEach(thisImage =>{
                const img: string = `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisImage?.image.name}`
                image.push(img);
            })


            const produit: ProduitType = {
                productUID: thisProduit.product_uid,
                nameProduct: thisProduit.name,
                price: thisProduit.price,
                imageLien: image,
                colorProduct: thisProduit.product_color.map((color) => color.color.value),
                tailleProduct: thisProduit.product_taille.map((taille) => taille.taille.value),
                avisMoyenne: moyenne,
                avisProduct: avis
            }

            produitReturned.push(produit);
        })
        res.status(200).json(produitReturned);
    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" });
    }
}