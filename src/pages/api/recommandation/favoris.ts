import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { ProduitType } from "../../../../types/home/Produit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "your're not authorize to access this route !" });
        return;
    }

    if (req.method === "GET") {

        const userUID: string = req.query.userID as string;

        if (userUID) {

            const favoris = await prisma.favorite.findMany({
                select: {
                    product_uid: true
                },
                where: {
                    account_uid: userUID
                }
            });

            const listeFavoris: string[] = [];

            favoris.forEach(thisFav => {
                listeFavoris.push(thisFav.product_uid)
            })

            //liste produits favoris
            const finalList: filtreCat[] = await recuperation_filtre(favoris);
            //liste des uid des categories
            const quatreClesMax: string[] = await filtreCategorie(finalList);
            //liste des produits qui possede une des 4 catégories
            const produitTrieCat: ProduitType[] = await trieproduitCategorie(quatreClesMax, listeFavoris);
            //liste de 4 produits 
            const listeProduits: ProduitType[] = await produits4(produitTrieCat, listeFavoris);
            res.status(200).json(listeProduits);
        }

    }
    else {
        res.status(400).json({ message: "this route is only GET" })
    }
}

//recupere les categorie de tout les produits en favoris
async function recuperation_filtre(favoris: { product_uid: string }[]) {

    const favorisAcount: filtreCat[] = [];

    await Promise.all(favoris.map(async (favori) => {
        const produit = await prisma.product.findMany({
            select: {
                product_uid: true,
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

            const product: filtreCat = {
                product_uid: thisProduit.product_uid,
                categorie: categorieListe
            };
            favorisAcount.push(product);
        });
    }));

    return favorisAcount;
}

//renvoie les 4 categories preferé 
async function filtreCategorie(listeProduits: filtreCat[]) {
    let categorieMap = await categoriesMap();

    // Parcour des produits
    listeProduits.forEach(thisProduit => {

        let listeCat = thisProduit.categorie;

        //Parcour des catégories dans les produits
        listeCat.forEach(thisCat => {
            const nb = categorieMap.get(thisCat.categorie_id) + 1;
            categorieMap.set(thisCat.categorie_id, nb);

        })
    })

    const sortedEntries = Array.from(categorieMap.entries()).sort((a, b) => b[1] - a[1]);

    // Extraire les quatre premières clés
    const quatreClesMax = sortedEntries.slice(0, 4).map(entry => entry[0]);

    return quatreClesMax;
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
async function trieproduitCategorie(listeCategories: string[], listeFavoris: string[]) {
    const listeProduct: ProduitType[] = [];
    const liste = await prisma?.product.findMany({
        select: {
            product_uid: true,
            name: true,
            description: true,
            price: true,
            product_images: {
                select: {
                    image: true
                }
            }

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
                    product_uid: {
                        in: listeFavoris
                    }
                }
            ]

        }
    });

    liste.forEach(thisProduct => {
        const listeImage: string[] = [];
        thisProduct.product_images.forEach(thisImage => {
            const image: string = `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisImage.image.name}`
            listeImage.push(image)
        })
        const product: ProduitType = {
            productUID: thisProduct.product_uid,
            nameProduct: thisProduct.name,
            price: thisProduct.price,
            description: thisProduct.description,
            imageLien: listeImage
        }
        listeProduct.push(product)
    })

    return listeProduct;
}


async function produits4(produitTrieCat: ProduitType[], listeid: string[]) {

    const listeProduct: ProduitType[] = [];
    let nb = 0;

    produitTrieCat.forEach(thisProduct => {
        if (!listeid.includes(thisProduct.productUID) && nb <= 4) {
            listeid.push(thisProduct.productUID);
            listeProduct.push(thisProduct)
            nb = nb + 1;
        }
    })

    if (listeProduct.length < 4) {
        const selectProduit = await prisma.product.findMany({
            select: {
                product_uid: true,
                name: true,
                description: true,
                price: true,
                product_images: {
                    select: {
                        image: true
                    }
                }
            },
            where: {
                product_uid: {
                    notIn: listeid
                }
            },
            take: 4 - listeProduct.length
        })

        selectProduit.forEach(thisProduct => {
            const listeImage: string[] = [];
            thisProduct.product_images.forEach(thisImage => {
                const image: string = `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisImage.image.name}`
                listeImage.push(image)
            })
            const product: ProduitType = {
                productUID: thisProduct.product_uid,
                nameProduct: thisProduct.name,
                price: thisProduct.price,
                description: thisProduct.description,
                imageLien: listeImage
            }
            listeProduct.push(product)
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



