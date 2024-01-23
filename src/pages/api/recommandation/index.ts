import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "your're not authorize to access this route !" });
        return;
    }

    if (req.method === "GET") {

        console.log("test")
        const userUID: string = req.query.userID as string;
        //liste produits favoris
        const finalList: filtreCat[] = await recuperation_filtre(userUID);
        //liste des uid des categories
        const quatreClesMax: string[] = await filtreCategorie(finalList);
        //liste des produits qui possede une des 4 catégories
        const produitTrieCat: produit[] = await trieproduitCategorie(quatreClesMax);
        //liste de 4 produits 
        const listeProduits: produit[] = await produits4(produitTrieCat);
        res.status(200).json(listeProduits);
    }
    else{
        res.status(400).json({message: "this route is only GET"})
    }
}

//recupere les categorie de tout les produits en favoris
async function recuperation_filtre(userUID: string) {
    const favorisAcount: filtreCat[] = [];
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
async function trieproduitCategorie(listeCategories: string[]) {
    const listeProduct = await prisma?.product.findMany({
        select: {
            product_uid: true,
            name: true,
            description: true,
            price: true

        },
        where: {
            product_categorie: {
                some: {
                    categorie_uid: {
                        in: listeCategories
                    }
                }
            }
        }
    });
    
    return listeProduct;
}


async function produits4 (produitTrieCat: produit[]) {
    const listeid: string[] = [];
    const listeProduct: produit[] = [];

    produitTrieCat.forEach(thisProduct=>{
        if(!listeid.includes(thisProduct.product_uid) && listeid.length <= 4){
            listeid.push(thisProduct.product_uid);
            listeProduct.push(thisProduct)
        }
    })

    if(listeProduct.length <4){
        const selectProduit = await prisma.product.findMany({
            select:{
                product_uid: true,
                name: true,
                description: true,
                price: true
            },
            where: {
                product_uid :{
                    notIn: listeid
                }
            },
            take: 4 - listeProduct.length
        }) 

        selectProduit.forEach(thisNewProduits =>{
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


