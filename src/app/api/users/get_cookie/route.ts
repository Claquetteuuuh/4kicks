import { NextResponse, NextRequest } from "next/server";
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken";


export const POST = async (req: NextRequest) => {
    const { conn } = await req.json();
    const email = req.headers.get("email") as string;
    console.log(email)
    console.log(conn)
    const account = await prisma?.account.findUnique({where: {email: email, connection_type: "OTHER"}})
    if(!account) {
        console.log("PAS EN DB")
        return NextResponse.json({status: 400, error: "Ce compte n'existe pas"})
    }
    const expire = 1* 24 * 60 * 60 * 1000;
    cookies().set('token', 'value', {expires: Date.now() - expire})
}