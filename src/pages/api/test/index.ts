import prisma from "@/lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    prisma.account.update({
        where: {
            email: "th.biabiany.dev@gmail.com",
        },
        data: {
            permission: "ADMIN",
        }
    })
    .then(e => {
        res.status(200).end()
    })
}