import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { AfficheType } from "../../../../types/home/Affiche";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method === "GET") {
        const prisma: PrismaClient = new PrismaClient();

        const affiches = await prisma.affiche.findMany({
            select: { affiche_uid: true, image: { select: { name: true } }, title: true, description: true, subtitle: true, callToAction: true, callToActionUrl: true }
        });

        const affichesReturned: AfficheType[] = []
        affiches.forEach(thisAffiche => {
            const affiche: AfficheType = {
                afficheUid: thisAffiche.affiche_uid,
                title: thisAffiche.title,
                description: thisAffiche.description,
                subtitle: thisAffiche.subtitle,
                callToAction: thisAffiche.callToAction as string,
                callToActionUrl: thisAffiche.callToActionUrl as string,
                imageLien: `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisAffiche.image.name}`
            }
            affichesReturned.push(affiche)
        })

        res.status(200).json(affichesReturned);
    } else {
        res.status(400).json({ message: "This route only accepts GET requests !" })
    }
}
