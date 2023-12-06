import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/lib/bucket";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const contentType = req.headers.get("Content-Type") as string;
  const bucketName = process.env.BUCKET_NAME;
  const fileName = `${uuidv4()}.jpg`;

  const data = await req.formData();
  const new_title = data.get("new_title") as string;
  const new_subtitle = data.get("new_subtitle") as string;
  const new_callToAction = data.get("new_callToAction") as string;
  const new_callToActionUrl = data.get("new_callToActionUrl") as string;
  const new_description = data.get("new_description") as string;

  const file: File | null = data.get("file") as File;
  console.log(file);

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
        name: fileName,
      },
    });
    if (image) {
      const affiche = await prisma.affiche.create({
        data: {
          subtitle: new_subtitle,
          title: new_title,
          description: new_description,
          image_uid: image.image_uid,
          callToAction: new_callToAction,
          callToActionUrl: new_callToActionUrl,
        },
      });
      if(affiche){
        return NextResponse.json({status: 201, message: "Affiche créé avec image"})
      }else{
        return NextResponse.json({status: 400, error: "Failing add affiche in db"})
      }
    }else{
      return NextResponse.json({status: 400, error: "Failing add img in db"})
    }
  }
};
