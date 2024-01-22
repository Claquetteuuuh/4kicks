import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "DELETE") {
        const { email } = req.query;
        const { fav } = req.query;

        const user = await prisma.account.findUnique({
            where: {
                email: email as string
            }
        })
        if (user) {

            const favori = await prisma.favorite.delete({
                where: {
                    account_uid_product_uid: {
                        account_uid: user.account_uid,
                        product_uid: fav as string
                    }
                }
            })
            if (favori) {
                res.status(200).json({ message: "favori supprimé" })
            }
            else {
                res.status(400).json({ error: "erreur lors de la suppression du favori" });
            }

        }
        else {
            res.status(400).json({ error: "This user doesn't exists" });
        }
    }
    else {
        res.status(400).json({ erreur: "route uniquement pour la methode DELETE" })
    }

}