import { NextRequest, NextResponse } from "next/server";
import { uploadFile, deleteFile } from "@/lib/bucket";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
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

    const user_uid: any = data.get("user_uid");

    console.log(user_uid);
    const user = await prisma.account.findUnique({
      where: {
        account_uid: user_uid,
      },
    });
    if (!user) {
      return NextResponse.json({ status: 400, message: "Account not found" });
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
        return NextResponse.json({
          status: 400,
          message: "error during the push of img !",
        });
      } else {
        const updatedAccount = await prisma.account.update({
          where: {
            account_uid: user_uid,
          },
          data: {
            image_uid: image.image_uid,
          },
        });
        if (!updatedAccount) {
          return NextResponse.json({
            status: 400,
            message: "error during the push of img !",
          });
        }
        return NextResponse.json({
          status: 200,
          message: "The image has been sended successfully",
          image_name: `${process.env.PUBLIC_DOMAINE_BUCKET_URL}${image.name}`,
          image_id: image.image_uid,
        });
      }
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ status: 400, message: "serverside error" });
  }
}
