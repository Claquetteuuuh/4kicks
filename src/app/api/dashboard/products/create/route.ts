import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/lib/bucket";
import prisma from "@/lib/prisma";
import { ProductImages } from "@prisma/client";

const uploadImgs = async (files: File[], bucketName: string, contentType: string) => {
    let imgsId: String[] = []
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${uuidv4()}.jpg`;
        const bytes = await file.arrayBuffer()
        const fileContent = Buffer.from(bytes);

        await uploadFile(
            bucketName,
            fileName,
            fileContent,
            contentType ? contentType : "image/png"
        );

        const image = await prisma.image.create({
            data: {
                name: fileName,
            },
        });
        if (image) {
            imgsId.push(image.image_uid)
        }
    }
    return imgsId
}

export const POST = async (req: NextRequest) => {
    const contentType = req.headers.get("Content-Type") as string;
    const bucketName = process.env.BUCKET_NAME;

    const data = await req.formData();
    const new_name = data.get("new_name") as string;
    const new_price = parseInt(data.get("new_price") as string);
    const new_complementDescription = data.get("new_complementDescription") as string;
    const new_marque = data.get("new_marque") as string;
    const new_description = data.get("new_description") as string;

    let files: File[] = [];
    for (let i = 1; i <= 4; i++) {
        if (data.get(`file${i}`)) {
            files.push(data.get(`file${i}`) as File)
        }
    }
    console.log(files)

    if (files.length == 0) {
        return NextResponse.json({
            success: false,
            message: "any file specified",
        });
    }

    if (bucketName) {

        const imgsId = await uploadImgs(files, bucketName, contentType)

        const product = await prisma.product.create({
            data: {
                name: new_name,
                price: new_price,
                description: new_description,
                complete_description: new_complementDescription,
                marque: new_marque
            },
        });
        imgsId.forEach(async id => {
            await prisma.productImages.create({
                data: {
                    product_uid: product.product_uid,
                    image_uid: id as string
                }
            })
        })

        if (product) {
            const product_uid = product.product_uid
            return NextResponse.json({ status: 201, message: "Produit créé avec images", produit: product_uid})
        } else {
            return NextResponse.json({ status: 400, error: "Failing add affiche in db" })
        }
    } else {
        return NextResponse.json({ status: 400, error: "Failing add img in db" })
    }

};
