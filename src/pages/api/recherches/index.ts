import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ArticlesType } from "../../../../types/home/Article";
import stringSimilarity from "string-similarity";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method == "GET") {

        
        
        const prisma: PrismaClient = new PrismaClient();

        const rechercheTexte: string | string[] = req.query.mot as string;

        const articlesListe = await prisma.product.findMany({
            select:{
                product_uid: true,
                name: true,
                price: true,
                product_image: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const search = (query: string, list: any[]) => { 

            const allEvents = list.map(event => ({
                event: event,
                similarity: stringSimilarity.findBestMatch(query.toLowerCase(), [event.name.toLowerCase()]).bestMatch.rating
            }));
        
            const results: any[] = [];
            allEvents.forEach(event => {
                if (event.similarity > 0.3) {
                    results.push(event);
                }
            });
        
            results.sort((a : any, b : any) => b.similarity - a.similarity);
        
            return results;
        }

        const recherches = search(rechercheTexte, articlesListe);

        
        const rechercheReturnes: ArticlesType[] = [];

        recherches.forEach(thisRecherche => {
            const recherche: ArticlesType = {
                productUID: thisRecherche.event.product_uid,
                nameProduct: thisRecherche.event.name,
                price: thisRecherche.event.price,
                imageLien: `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisRecherche.event.product_image}`
            }
            console.log(recherche);
            rechercheReturnes.push(recherche);
        })
        res.status(200).json(rechercheReturnes);
    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" })
    }
}