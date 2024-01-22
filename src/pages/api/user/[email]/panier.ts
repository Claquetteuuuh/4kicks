import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "POST"){
        const {email} = req.query;
        const user = await prisma.account.findUnique({
            where: {
                email: email as string
            }
        })

        if(!user){
            res.status(400).json({error: "This user doesn't exists"});
            return;
        }
        const {id, taille} = req.body;
        const product = await prisma.product.findUnique({
            where: {
                product_uid: id
            }
        })
        if(!product){
            res.status(400).json({error: "This product doesn't exists"});
            return;
        }
        const productInPanier = await prisma.productInPanier.findMany({
            where: {
                account_uid: user.account_uid,
                product_uid: product.product_uid
            }
        })
        if(productInPanier.length != 0){
            res.status(200).json({error: "This product is already in panier !"})
            return;
        }
        const productTaille = await prisma.taille.findUnique({
            where: {
                value: taille
            }
        })
        if(!productTaille){
            res.status(400).json({error: "This size doesnt exists !"})
            return;
        }
        const panied = await prisma.productInPanier.create({
            data: {
                product_uid: product.product_uid,
                account_uid: user.account_uid,
                quantite: 1,
                product_taille_uid: productTaille.taille_uid
            }
        })
        if(!panied){
            res.status(400).json({error: "An error occured"})
            return;
        }
        res.status(201).json({message: "Product added successfully", panied})
        return;
    }
}