import { NextApiRequest, NextApiResponse } from "next";
import { Preference, Prisma } from "@prisma/client";
import { uploadFile } from "@/lib/bucket";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.headers.host;
    if (process.env.NODE_ENV === "production" && host != process.env.HOST) {
        res.status(401).json({ message: "Your're not authorize to access this route !" })
        return;
    }

    if (req.method === "PUT") {
        const { email } = req.query;
        const contentType = req.headers.contentType ?? "image/png"
        const bucketName = process.env.BUCKET_NAME;
        const fileName = `${uuidv4()}.jpg`;
        let image = null;

        interface MyRequestBody {
            new_firstName: string;
            new_lastName: string;
            new_userName: string;
            new_email: string;
            new_preference: Preference;
            file: File | null;
        }
        const {
            new_firstName,
            new_lastName,
            new_userName,
            new_preference,
            new_email,
            file
        }: MyRequestBody = req.body

        if (file) {
            const bytes = await file.arrayBuffer();
            const fileContent = Buffer.from(bytes);
            
            if (bucketName) {
                await uploadFile(
                    bucketName,
                    fileName,
                    fileContent,
                    contentType as string
                );
                image = await prisma?.image.create({
                    data:{
                        name:fileName
                    }
                })
            }
        }
        const user = await prisma?.account.update({
            data: {
                email: new_email,
                last_name: new_lastName,
                first_name: new_firstName,
                username: new_userName,
                preference: new_preference,
                image_uid: image?.image_uid 
            },
            where: {
                email: email as string
            }
        })
    }

    function uuidv4() {
        throw new Error("Function not implemented.");
    }
    }
