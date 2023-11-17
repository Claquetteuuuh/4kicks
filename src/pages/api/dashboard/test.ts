import { MailjetAuthorType, MailjetContentType, MailjetTargetType, sendMail } from "@/lib/mailjet";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "GET"){
        const author: MailjetAuthorType = {
            email: "th.biabiany.dev@gmail.com",
            name: "Thomas Biabiany"
        }
        const target: MailjetTargetType = {
            email: "th.biabiany@protonmail.com",
            name: "Thomas Biabiany"
        }
        const content: MailjetContentType = {
            subject: "test mail",
            text: "test text"
        }
        sendMail(author, target, content)

        res.status(200).end()
    }
}