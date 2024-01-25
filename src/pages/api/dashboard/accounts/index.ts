import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import axios from "axios";
import { Permission, Preference, Prisma } from "@prisma/client";
import suppressionImages from "../commun/suppressionImages";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET" && req.query.accountUID != undefined) {
        const comptes = await prisma.account.findUnique(
            {
                where: {
                    account_uid: req.query.accountUID as string
                }
            }
        );
        if (!comptes) {
            res.status(400).json({ error: "Error getting accounts, A-001" })
        }
        res.status(200).json(comptes)
    }
    else if (req.method === "GET") {
        const comptes = await prisma.account.findMany();
        if (!comptes) {
            res.status(400).json({ error: "Error getting accounts, A-002" })
        }
        res.status(200).json(comptes)

    } else if (req.method === "DELETE") {

        const { account_uid } = req.headers;
        if (!account_uid) {
            res.status(400).json({ error: "account uid not specified ! A-003" })
            return;
        }
        if (await suppression(account_uid as string)) {
            const deletedAccount = await prisma.account.delete({
                where: {
                    account_uid: account_uid as string
                }
            })

            if (deletedAccount) {
                res.status(200).json({ message: "the account has been deleted" });
            } else {
                res.status(400).json({ error: "Error during deleting. A-004" })
            }
        }
        else {
            res.status(400).json({ error: "Error during deleting. A-005" })
        }


    }

    else if (req.method === "POST") {

        interface MyRequestBody {
            new_email: string;
            new_userName: string;
            new_firstName: string;
            new_lastName: string;
            new_preference: Preference;
            new_password: string;
            new_permission: Permission;
            new_newsletter: boolean;
        }
        const {
            new_email,
            new_userName,
            new_firstName,
            new_lastName,
            new_preference,
            new_password,
            new_permission,
            new_newsletter
        }: MyRequestBody = req.body

        if (new_email == undefined) {
            console.log("email undefine")
        }

        const account = await prisma.account.create({
            data: {
                email: new_email,
                username: new_userName,
                first_name: new_firstName,
                last_name: new_lastName,
                preference: new_preference,
                password: new_password,
                permission: new_permission,
                completed: true,
                newsletter: new_newsletter
            }
        })

        if (account) {

            res.status(200).json({ message: "the account has been created" });
        } else {
            res.status(400).json({ error: "Error during creation. P-002" })
        }
    }
    else if (req.method === "PUT") {
        interface MyRequestBody {
            account_uid: string;
            permission: Permission;

        }
        const {
            account_uid,
            permission

        }: MyRequestBody = req.body;

        const account = await prisma.account.update({
            data: {
                permission: permission,
            },
            where: {
                account_uid: account_uid
            }
        })
        if (account) {
            res.status(200).json({ message: "the account has been updated" });
        } else {
            res.status(400).json({ error: "Error during update. P-002" })
        }

    }
    else {
        res.status(400).json({ error: "Error this route is only GET, DELETE, PUSH, PUT" })
    }

}
async function suppression(account_uid: string) {

    //suppression image
    const image = await prisma.image.findMany({
        select: {
            image_uid: true,
            name: true
        },
        where: {
            account: {
                some: {
                    account_uid: account_uid
                }
            }
        }
    })

    suppressionImages(image);

    //suppression message
    const deleteMessage = await prisma.message.deleteMany({
        where: {
            account_uid: account_uid
        }
    })

    //suppression ticket
    const deleteTicketUser = await prisma.ticket.deleteMany({
        where: {
            user_uid: account_uid
        }

    });

    const deleteTicketAdmin = await prisma.ticket.deleteMany({
        where: {
            admin_uid: account_uid
        }

    });

    //suppression avis
    const deleteAvis = await prisma.avis.deleteMany({
        where: {
            account_uid: account_uid
        }

    });

    //suppression favoris
    const deleteFavoris = await prisma.favorite.deleteMany({
        where: {
            account_uid: account_uid
        }
    });

    //suppression product_in_panier
    const deleteProductPanier = await prisma.productInPanier.deleteMany({
        where: {
            account_uid: account_uid
        }
    });

    //suppression product_in_achat
    const deleteProductAchat = await prisma.productInAchat.deleteMany({
        where: {
            achat: {
                account_uid: account_uid
            }
        }
    })

    //suppression achat
    const deleteAchat = await prisma.achat.deleteMany({
        where: {
            account_uid: account_uid
        }
    })

    //suppression shipAdress
    const deleteAdress = await prisma.shipAddress.deleteMany({
        where: {
            account_uid: account_uid
        }
    })



    if (deleteMessage && deleteTicketUser && deleteTicketAdmin && deleteAvis && deleteFavoris && deleteProductPanier && deleteAdress && deleteAchat && deleteProductAchat) {
        return true
    }
    else {
        return false
    }
}