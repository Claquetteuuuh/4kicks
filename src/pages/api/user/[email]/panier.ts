import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PanierProductType } from "../../../../../types/product/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.query;
    const user = await prisma.account.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      res.status(400).json({ error: "This user doesn't exists" });
      return;
    }
    const { id, taille } = req.body;
    const product = await prisma.product.findUnique({
      where: {
        product_uid: id,
      },
    });
    if (!product) {
      res.status(400).json({ error: "This product doesn't exists" });
      return;
    }
    const productInPanier = await prisma.productInPanier.findMany({
      where: {
        account_uid: user.account_uid,
        product_uid: product.product_uid,
      },
    });
    if (productInPanier.length != 0) {
      res.status(200).json({ error: "This product is already in panier !" });
      return;
    }
    const productTaille = await prisma.taille.findUnique({
      where: {
        value: taille,
      },
    });
    if (!productTaille) {
      res.status(400).json({ error: "This size doesnt exists !" });
      return;
    }
    const panied = await prisma.productInPanier.create({
      data: {
        product_uid: product.product_uid,
        account_uid: user.account_uid,
        quantite: 1,
        product_taille_uid: productTaille.taille_uid,
      },
    });
    if (!panied) {
      res.status(400).json({ error: "An error occured" });
      return;
    }
    res.status(201).json({ message: "Product added successfully", panied });
    return;
  } else if (req.method === "GET") {
    const { email } = req.query;
    const user = await prisma.account.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      res.status(400).json({ error: "This user doesn't exists" });
      return;
    }

    const panier = await prisma.productInPanier.findMany({
        where: {
            account_uid: user.account_uid
        },
        select: {
            taille: {
                select: {
                    value: true
                }
            },
            product: {
                select: {
                    product_uid: true,
                    name: true,
                    product_color: {
                        select: {
                            color: {
                                select:{
                                    value: true
                                }
                            }
                        }
                    },
                    marque: true,
                    price: true,
                    product_images: {
                        select: {
                            image: true
                        }
                    },
                    description: true,
                }
            }
        }
    })
    let renderedPanier: PanierProductType[] = []
    for (let i = 0; i < panier.length; i++) {
        const produit = panier[i];
        renderedPanier.push({
            product_uid: produit.product.product_uid,
            product_name: produit.product.name,
            color: produit.product.product_color[0]?.color.value || "none",
            marque: produit.product.marque,
            size: produit.taille.value,
            price: produit.product.price,
            quantite: 1,
            image_url: `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${produit.product.product_images[0].image.name}`,
            description: produit.product.description
        })
    }
    res.status(200).json(renderedPanier);
  } 
}
