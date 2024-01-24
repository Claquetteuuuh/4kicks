import { NextApiRequest, NextApiResponse } from "next";
import { AchatProductType, AchatsType } from "../../../../../types/dashboard/AchatsType";
import { ProduitType } from "../../../../../types/home/Produit";
import { ProductType } from "../../../../../types/dashboard/ProductType";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const achat_uid = req.query.achatUID as string | undefined;

    if (req.method === "GET" && achat_uid !== undefined) {
        const achat = await prisma?.achat.findUnique({
            select: {
                achat_uid: true,
                account_uid: true,
                order_id: true,
                creation_date: true,
                address_uid: true,
                promo_uid: true,
                status: true,
                product_in_achat: {
                    select: {
                        product: {
                            select: {
                                product_uid: true,
                                name: true,
                                price: true,
                                product_images: {
                                    select: {
                                        image: true
                                    }
                                },
                                description: true

                            }
                        },
                        color: {
                            select: {
                                value: true
                            }
                        },
                        taille: {
                            select: {
                                value: true
                            }
                        },
                        quantity: true

                    }

                }

            },
            where: {
                achat_uid: achat_uid
            }
        })
        if (achat) {
            let total: number = 0
            const products: AchatProductType[] = [];
            achat.product_in_achat.forEach(thisProduct => {
                total += 1;
                const prouct: AchatProductType = {
                    id: total,
                    productUID: thisProduct.product.product_uid,
                    nameProduct: thisProduct.product.name,
                    price: thisProduct.product.price,
                    imageLien: `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${thisProduct.product.product_images[0].image.name}`,
                    description: thisProduct.product.description,
                    color_product: thisProduct.color?.value,
                    taille_product: thisProduct.taille?.value,
                    quantite_product: thisProduct.quantity
                }

                products.push(prouct);
            })
            const achatReturned: AchatsType = {
                achat_uid: achat.achat_uid,
                account_uid: achat.account_uid,
                order_id: achat.order_id,
                creation_date: achat.creation_date.toLocaleDateString('fr-FR'),
                promo_uid: achat.promo_uid as string,
                address_uid: achat.address_uid as string,
                status: achat.status,
                product_in_achat: products


            }
            if (achatReturned) {
                res.status(200).json(achatReturned)
            }
            else {
                res.status(400).json({ error: "Error getting achat, P-001" })
            }
        }
        else {
            res.status(400).json({ error: "Error getting achat, P-002" })
        }
    }
    else if (req.method === "GET") {
        const achat = await prisma?.achat.findMany()

        if (achat) {
            res.status(200).json(achat)
        }
        else {
            res.status(400).json({ error: "Error getting achat, P-003" })
        }
    }
    else if (req.method === "PUT") {

        interface MyRequestBody {
            achat_uid: string;
            status: string;

        }
        const {
            achat_uid,
            status

        }: MyRequestBody = req.body;

        console.log(achat_uid)

        if (achat_uid) {
            const modifAchat = await prisma?.achat.update({
                data: {
                    status: status
                },
                where: {
                    achat_uid: achat_uid
                }
            })

            if (modifAchat) {
                res.status(200).json({ message: "modification effectue" })
            }
            else {
                res.status(400).json({ error: "Error updating achat, P-002" })
            }
        }
        else {
            res.status(400).json({ error: "Error updating achat, P-003" })
        }
    }
    else {
        res.status(400).json({ error: "Error route only GET and PUT, P-004" })
    }
}