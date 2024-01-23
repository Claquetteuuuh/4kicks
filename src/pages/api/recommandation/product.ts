import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "your're not authorize to access this route !" });
        return;
    }

    if (req.method === "GET") {

        const productUID: string = req.query.productID as string;

        if (productUID) {
            const categories = await prisma.productCategories.findMany({
                select: {
                    categorie_uid: true
                },
                where: {
                    product_uid: productUID
                },
                take: 4
            })
            if (categories) {
                const listeCategorie: string[] = []
                categories.forEach(thisCat => {
                    listeCategorie.push(thisCat.categorie_uid)
                })

                //liste des produits qui possede une des 4 catégories
                const produitTrieCat: produit[] = await trieproduitCategorie(listeCategorie, productUID);
                //liste de 4 produits 
                const listeProduits: produit[] = await produits4(produitTrieCat, productUID);
                res.status(200).json(listeProduits);
            }
            else {
                res.status(400).json({ message: "Aucun produit correspondant" })
            }

        }
    }
    else {
        res.status(400).json({ message: "this route is only GET" })
    }
}



// renvoie un map des categorie uid avec comme value 0
async function categoriesMap() {
    let tableauxCategorie = new Map();

    const requete = await prisma?.categorie.findMany({
        select: {
            name: true,
            categorie_uid: true
        }
    });

    requete?.forEach(thisCat => {
        tableauxCategorie.set(thisCat.categorie_uid, 0)
    })

    return tableauxCategorie;
}

// retourne une liste de produits correspondant au categories
async function trieproduitCategorie(listeCategories: string[], productUID: string) {
    const listeProduct = await prisma?.product.findMany({
        select: {
            product_uid: true,
            name: true,
            description: true,
            price: true

        },
        where: {
            OR: [
                {
                    product_categorie: {
                        some: {
                            categorie_uid: {
                                in: listeCategories
                            }
                        }
                    }
                }
            ],
            NOT: [
                {
                    product_uid: productUID
                }
            ]

        }
    });

    return listeProduct;
}


async function produits4(produitTrieCat: produit[], productUID: string) {
    const listeid: string[] = [];
    const listeProduct: produit[] = [];

    produitTrieCat.forEach(thisProduct => {
        if (!listeid.includes(thisProduct.product_uid) && listeid.length <= 4) {
            listeid.push(thisProduct.product_uid);
            listeProduct.push(thisProduct)
        }
    })

    if (listeProduct.length < 4) {
        const selectProduit = await prisma.product.findMany({
            select: {
                product_uid: true,
                name: true,
                description: true,
                price: true
            },
            where: {
                OR: [
                    {
                        product_uid: {
                            notIn: listeid
                        }
                    }
                ],
                NOT: [
                    {
                        product_uid: productUID
                    }
                ]


            },
            take: 4 - listeProduct.length
        })

        selectProduit.forEach(thisNewProduits => {
            listeProduct.push(thisNewProduits);
        })
    }

    return listeProduct;
}


type filtreCat = {
    product_uid: string,
    categorie: categorie[]
}
type categorie = {
    categorie_id: string,
    name: string
}
type produit = {
    product_uid: string,
    name: string,
    description: string,
    price: number
}


