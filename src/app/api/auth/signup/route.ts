import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = (req: NextApiRequest, res: NextApiResponse) => {

}

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req)
    return NextResponse.json({success: 200, message: "OK"})
}