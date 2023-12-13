import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import stringSimilarity from "string-similarity";
import { ProduitType } from "../../../../types/home/Produit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method == "GET") {

        const prisma: PrismaClient = new PrismaClient();

        let rechercheTexte = ""

        if (req.query.mot) {
            rechercheTexte = req.query.mot as string;
        }


        const articlesListe = await prisma.product.findMany({
            select: {
                product_uid: true,
                name: true,
                price: true,
                product_images: {
                    select: {
                        image: {
                            select: {
                                name: true
                            }
                        }
                    }
                }

            }
        })

        const search = (query: string, list: any[]) => {

            const allEvents = list.map(event => {
                const eventName = event.name || '';
                const image: string[] = []

                event.product_images.forEach((thisImage: { image: { name: any; }; }) => {
                    const imageProv: string = `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisImage.image.name}`
                    image.push(imageProv)
                })
                return {
                    name: eventName,
                    price: event.price,
                    product_uid: event.product_uid,
                    imageName: image,
                    similarity: stringSimilarity.findBestMatch(query.toLowerCase(), [eventName.toLowerCase()]).bestMatch.rating
                };
            });
            console.log(allEvents[1].imageName)

            const results: any[] = [];
            allEvents.forEach(event => {
                if (event.similarity > 0.3) {
                    results.push(event);
                }
            });

            results.sort((a: any, b: any) => b.similarity - a.similarity);

            return results;
        }

        const recherches = search(rechercheTexte, articlesListe);


        const rechercheReturnes: ProduitType[] = [];

        recherches.forEach(thisRecherche => {

            const recherche: ProduitType = {
                productUID: thisRecherche.product_uid,
                nameProduct: thisRecherche.name,
                price: thisRecherche.price,
                imageLien: thisRecherche.imageName,
                description: thisRecherche.description
            }
            rechercheReturnes.push(recherche);
        })
        res.status(200).json(rechercheReturnes);
    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" })
    }
}