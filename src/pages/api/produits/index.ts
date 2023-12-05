import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { AvisType } from "../../../../types/home/Avis";
import { FullProductType } from "../../../../types/product/Product";

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
                complete_description: true,
                price: true,
                marque: true,
                product_images: {
                    select: {
                        image: {
                            select: {
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

        const produitReturned: FullProductType[] = [];

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
            thisProduit.product_images.forEach(thisImage => {
                const img: string = `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisImage?.image.name}`
                image.push(img);
            })


            const produit: FullProductType = {
                product_uid: thisProduit.product_uid,
                product_name: thisProduit.name,
                price: thisProduit.price,
                marque: thisProduit.marque,
                colors: thisProduit.product_color.map((color) => color.color.value),
                sizes: thisProduit.product_taille.map((taille) => taille.taille.value),
                description: thisProduit.description,
                complete_description: thisProduit.complete_description,
                avis: avis,
                images_url: image,
                avis_avg: moyenne

            }

            produitReturned.push(produit);
        })
        res.status(200).json(produitReturned);
    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" });
    }
}