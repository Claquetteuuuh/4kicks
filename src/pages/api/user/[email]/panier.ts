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
        const {id} = req.body;
        const product = await prisma.product.findUnique({
            where: {
                product_uid: id
            }
        })
        if(!product){
            res.status(400).json({error: "This product doesn't exists"});
            return;
        }
        console.log(product)
    }
}