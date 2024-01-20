import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/bucket";
import { v4 as uuidv4 } from "uuid";
import suppressionImages from "../commun/suppressionImages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const affiches = await prisma.affiche.findMany();
    if (!affiches) {
      res.status(400).json({ error: "Error getting affiches, D-001" });
    }
    res.status(200).json(affiches);


  } else if (req.method === "DELETE") {

    const { affiche_uid } = req.headers;
    if (!affiche_uid) {
      res.status(400).json({ error: "affiche uid not specified ! A-001" });
      return;
    }
    const images = await prisma.image.findMany({
      select: {
        image_uid: true,
        name: true
      },
      where: {
        affiche: {
          some: {
            affiche_uid: affiche_uid as string
          }
        }
      }
    })

    const deleted = await prisma.affiche.delete({
      where: {
        affiche_uid: affiche_uid as string,
      },
    });
    if (deleted) {
      if (suppressionImages(images)) {
        res.status(200).json({ message: "the poster has been deleted" });
      } else {
        res.status(400).json({ error: "Error during deleting. P-002" })
      }
    } else {
      res.status(400).json({ error: "Error during deleting. A-002" });
    }
    


  } else if (req.method === "POST") {
    const contentType = req.headers["Content-Type"] as string;
    const bucketName = process.env.BUCKET_NAME;
    const fileName = `${uuidv4()}.jpg`;

    // get the file content
    interface MyRequestBody {
      new_title: string;
      new_description: string;
      new_subtitle: string;
      new_CallToAction: string;
      new_CallToActionUrl: string;
      data: FormData;
    }
    const {
      new_title,
      new_description,
      new_subtitle,
      new_CallToAction,
      new_CallToActionUrl,
      data,
    }: MyRequestBody = req.body;

    console.log(data.get("file"));
    //const { new_title, new_description, new_subtitle, new_CallToAction, new_CallToActionUrl, data } = req.body;
    const file = data.get("file") as File;
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
      let reussi: boolean = false;
      if (image) {
        const affiche = await prisma.affiche.create({
          data: {
            subtitle: new_subtitle,
            title: new_title,
            description: new_description,
            image_uid: image.image_uid,
            callToAction: new_CallToAction,
            callToActionUrl: new_CallToActionUrl,
          },
        });
        if (affiche) {
          reussi = true;
        }
      }

      if (reussi) {
        res.status(200).json({ message: "the product has been create" });
      } else {
        res.status(400).json({ error: "Error during creating. P-002" });
      }
    }
  }
}
