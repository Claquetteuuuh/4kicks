import { PrismaClient } from "@prisma/client";
import { METHODS } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Commande, Product_commande } from "../../../../types/home/Commande";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;
    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method === "GET") {
        // headers account_uid string
        const prisma: PrismaClient = new PrismaClient();

        const account_uid: string = req.query.account_uid as string

        const commandes = await prisma.achat.findMany({
            select: {
                achat_uid: true,
                creation_date: true,
                product_in_achat: {
                    select: {
                        product: {
                            select: {
                                name: true,
                                description: true,
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
                        },
                        quantity: true,
                        color: {
                            select: {
                                value: true
                            }
                        },
                        taille: {
                            select: {
                                value: true
                            }
                        }
                    }
                }
            },
            where: {
                account_uid: account_uid
            }
        });

        const commandeReturned: Commande[] = [];

        commandes.forEach(thisCommande => {

            let total: number = 0;
            const products: Product_commande[] = [];

            thisCommande.product_in_achat.forEach(thisProduct => {
                let image: string;
                try {
                    image = thisProduct.product.product_images[0].image.name
                }
                catch {
                    image = "default";
                }
                const product: Product_commande = {
                    name_product: thisProduct.product.name,
                    description_product: thisProduct.product.description,
                    price_product: thisProduct.product.price,
                    name_image: image,
                    quantite_product: thisProduct.quantity,
                    color_product: thisProduct.color?.value,
                    taille_product: thisProduct.taille?.value
                }
                total += product.price_product * product.quantite_product;
                products.push(product);
            })


            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = thisCommande.creation_date.toLocaleDateString('fr-FR');

            const commande: Commande = {
                achat_uid: thisCommande.achat_uid,
                creation_date: formattedDate,
                price_commande: total,
                product_commande: products
            }

            commandeReturned.push(commande);
        })
        res.status(200).json(commandeReturned);
    }
    else if (req.method === "POST") {

        interface MyRequestBody {
            adress_uid: string;
            account_uid: string;
            product_commande: {
                product_uid: string;
                color_uid?: string;
                quantite: number;
                taille_uid?: string;
            }[];
        }
        const {
            adress_uid,
            account_uid,
            product_commande
        }: MyRequestBody = req.body



        const commande = await prisma?.achat.create({
            data: {
                account_uid: account_uid,
                address_uid: adress_uid,
            }
        })

        if (commande) {
            product_commande.forEach(async thisProduct => {
                await prisma?.productInAchat.create({
                    data: {
                        product_uid: thisProduct.product_uid,
                        achat_uid: commande.achat_uid,
                        quantity: thisProduct.quantite,
                        taille_uid: thisProduct.taille_uid,
                        color_uid: thisProduct.color_uid

                    }
                })
            })

            res.status(200).json(commande.achat_uid);
        }
        else {
            res.status(400).json({ message: "erreur lors de la creation d'un Achat" })
        }
    }

    else {
        res.status(400).json({ message: "This route only accepts GET and POST requests !" })
    }
}