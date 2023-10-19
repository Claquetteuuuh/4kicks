import { NextRequest, NextResponse } from "next/server";
import { uploadFile, deleteFile } from "../../../../utils/bucket";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient();

    const contentType = req.headers.get("Content-Type");
    const bucketName = process.env.BUCKET_NAME;
    const fileName = `${uuidv4()}.jpg`;

    // get the file content
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
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
      if (!image) {
        await deleteFile(bucketName, fileName);
      }
    }
    prisma.$disconnect();
    return NextResponse.json({
      success: true,
      message: "The image has been sended successfully",
      image: `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${fileName}`,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, message: "serverside error" });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({
      success: false,
      message: "Any file has been specified !",
    });
  }
  const prisma = new PrismaClient();
  const image = await prisma.image.findUnique({
    where: {
      name: filename,
    },
  });
  if (image) {
    const bucketName = process.env.BUCKET_NAME;
    if (!bucketName) {
      return NextResponse.json({
        success: false,
        message: "Serverside error",
      });
    }
    await deleteFile(bucketName, filename);
    await prisma.image.delete({
      where: {
        name: filename
      }
    })
  }else{
    return NextResponse.json({
      success: false,
      message: "This image does'nt exists",
    });
  }
  return NextResponse.json({
    success: true,
    message: "the file has been deleted successfully !",
  });
}
