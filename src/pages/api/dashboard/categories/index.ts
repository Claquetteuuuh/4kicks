import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const categories = await prisma.categorie.findMany();
        if (!categories) {
            res.status(400).json({ error: "Error getting categories, D-001" })
        }
        res.status(200).json(categories)
    }
    else if (req.method === "POST") {
        const new_name = req.headers["new_name"] as string

        const categorie = await prisma.categorie.create({
            data: {
                name: new_name
            }
        });

        // Vérifier si l'identifiant existe plutôt que !categorie
        if (categorie.categorie_uid) {
            res.status(201).json({ message: "Catégorie créée" });
        } else {
            res.status(400).json({ error: "Failed to create category" });
        }
    }
    else if (req.method === "DELETE") {
        const id = req.headers["categorie_uid"] as string
        const categorie = await prisma.categorie.delete({
            where: {
                categorie_uid: id
            }
        })
        if (!categorie) {
            res.status(400).json({ error: "Failed to delete category" });
        } else {
            res.status(200).json({ message: "Categorie supprimé" });
        }
    }
}