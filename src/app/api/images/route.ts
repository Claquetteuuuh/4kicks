import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/utils/bucket"; // Importez votre fonction uploadFile
import { v4 as uuidv4 } from "uuid";

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

    const bytes = await file.arrayBuffer();
    const fileContent = Buffer.from(bytes);

    if (bucketName) {

      await uploadFile(
        bucketName,
        fileName,
        fileContent,
        contentType ? contentType : "image/png"
      );
    }
    return NextResponse.json({ success: true, message: "The image has been sended successfully", image: `https://pub-d1750aa6705b422d8662ddf4637b2a34.r2.dev/${fileName}` });

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, message: "serverside error" });
  }
}