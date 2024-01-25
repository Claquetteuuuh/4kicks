import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "POST"){
        const { promo } = req.body;
        if(!promo){
            res.status(400).json({error: "cannot find code"})
            return;
        }
        const code = await prisma.promotionCode.findUnique({
            where: {
                code: promo
            }
        })
        if(!code){
            res.status(400).json({error: "cannot find code"})
            return;
        }
        res.status(200).json({
            message: "Your code is valid",
            data: {
                code: code.code,
                coefficient: code.coefficient
            }
        })
    }else{
        res.status(400).json({error: "This route only accept POST !"})
    }
}