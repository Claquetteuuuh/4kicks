import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { FullProductType } from "../../../../types/product/Product";
import { ProduitType } from "../../../../types/home/Produit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const host = req.headers.host;

    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "your're not authorize to access this route !" })
        return;
    }

    if (req.method === "GET") {

        const userUID: string = req.query.userID as string;

        const temp = await parcourProduct(userUID)

        if (temp) {
            res.status(200).json(temp);
        }
    }
    else if (req.method === "POST") {

        interface MyRequestBody {
            product_uid: string;
            account_email: string;
        }
        const {
            product_uid,
            account_email
        }: MyRequestBody = req.body;

        const account_uid = await prisma?.account.findUnique({
            select: {
                account_uid: true
            },
            where: {
                email: account_email
            }
        })
        if (account_uid) {
            const testfav = await prisma?.favorite.findMany({
                select: {
                    account_uid: true
                },
                where: {
                    AND: [
                        {
                            account_uid: account_uid.account_uid
                        },
                        {
                            product_uid: product_uid
                        }
                    ]
                }
            })
            console.log(testfav)
            if (testfav?.length == 0) {
                console.log('test')
                const favori = await prisma?.favorite.create({
                    data: {
                        account_uid: account_uid.account_uid,
                        product_uid: product_uid
                    } 
                });
                if (favori) {
                    res.status(200).json("favorite created");
                }
                else {
                    res.status(400).json({ message: "erreur lors de la crétion du favoris" })
                }
            }
            else {
                const favori = await prisma?.favorite.delete({
                    where: {
                        account_uid_product_uid: {
                            account_uid: account_uid.account_uid,
                            product_uid: product_uid
                        }
                    }
                });
                if (favori) {
                    res.status(200).json("favorite deleted");
                }
                else {
                    res.status(400).json({ message: "erreur lors de la suppression du favoris" })
                }
            }
        }
        else {
            res.status(400).json({ message: "erreur lors de la crétion du favoris" })
        }

    }
    else {
        res.status(400).json({ message: "This route only accepts GET requests !" })
    }

}

async function parcourProduct(userUID: string) {
    const prisma: PrismaClient = new PrismaClient();
    const favorisAcount: ProduitType[] = [];
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
                name: true,
                price: true,
                complete_description: true,
                product_images: {
                    select: {
                        image: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
            },
            where: {
                product_uid: favori.product_uid
            }
        });

        produit.forEach(thisProduit => {
            const image: string[] = [];
            thisProduit.product_images.forEach(thisImage => {
                const img: string = `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisImage?.image.name}`;
                image.push(img);
            });

            const product: ProduitType = {
                productUID: thisProduit.product_uid,
                nameProduct: thisProduit.name,
                price: thisProduit.price,
                description: thisProduit.complete_description,
                imageLien: image
            };
            favorisAcount.push(product);
        });
    }));

    // Close the Prisma client connection
    await prisma.$disconnect();

    return favorisAcount;
}