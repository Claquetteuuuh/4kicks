import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { METHODS } from "http";
import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/bucket";
import { v4 as uuidv4 } from 'uuid';
import { ProductImages } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const products = await prisma.product.findMany();
        if (!products) {
            res.status(400).json({ error: "Error getting products, P-003" })
        }
        res.status(200).json(products)
    } else if (req.method === "DELETE") {
        const { product_uid } = req.headers;
        if (!product_uid) {
            res.status(400).json({ error: "product uid not specified ! P-001" })
            return;
        }
        const deleted = await prisma.product.delete({
            where: {
                product_uid: product_uid as string
            }
        })
        if (deleted) {
            res.status(200).json({ message: "the product has been deleted" });
        } else {
            res.status(400).json({ error: "Error during deleting. P-002" })
        }
    }

    else if (req.method === "POST") {

        interface MyRequestBody {
            new_name: string;
            new_description: string;
            new_price: number;
            new_c_description: string;
            new_marque: string;
            new_images: FileList;
          }
          const {
            new_name,
            new_description,
            new_price,
            new_c_description,
            new_marque,
            new_images,
          }: MyRequestBody = req.body;
        //const { new_name, new_description, new_price, new_c_description, new_marque, new_images } = req.body;
        const contentType = req.headers["Content-Type"] as string;
        const bucketName = process.env.BUCKET_NAME;
        const fileName = `${uuidv4()}.jpg`;


        //debug
          for(let i=0; i<10; i++){
            console.log("test")
          }

          console.log(new_images)
        
        Array.from(new_images).map(async file =>{
            if (!file) {
                return NextResponse.json({
                    success: false,
                    message: "any file specified",
                });
            }
            
            
            const bytes = await file.arrayBuffer();
            const fileContent = Buffer.from(bytes);
            if (bucketName) {
                await uploadFile(
                    bucketName,
                    fileName,
                    fileContent,
                    contentType ? contentType : "image/png"
                );
                const image = await prisma.image.create({
                    data: {
                        name: fileName
                    },
                });
            };
 
        })
        //creation du produit
        /*const create = await prisma.product.create({
            data: {
                name: new_name as string,
                description: new_description as string,
                price: Number(new_price),
                complete_description: new_c_description as string,
                marque: new_marque as string
            }
        })*/
        if (true) {
            res.status(200).json({ message: "the product has been create" });
        } else {
            res.status(400).json({ error: "Error during creating. P-002" })
        }

    }
}
