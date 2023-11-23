import { NextApiRequest, NextApiResponse } from "next";
import { sendAccountCreation } from "@/lib/mailer";
import { createAllTemplates } from "../../../../email/createTemplates";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "GET"){
        const send = await sendAccountCreation("rafik.bouchenna050@gmail.com", "Rafik Goat", "https://4kicks.store/testlink/")
        if(send){
            res.status(200).json({message: "Your mail has been sended successfully"});
        }else{
            res.status(400).json({message: "Your mail hasn't been sended"});
        }
    }
}