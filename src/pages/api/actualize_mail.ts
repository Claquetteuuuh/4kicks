import { NextApiRequest, NextApiResponse } from "next";
import { createAllTemplates } from "../../../email/createTemplates";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET"){
        createAllTemplates();
        res.status(200).end()
    }
    res.status(400).end()
}