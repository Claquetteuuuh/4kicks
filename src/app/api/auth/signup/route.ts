import { NextResponse, NextRequest } from "next/server";

export const GET = (req: NextRequest) => {
    console.log(req)
    return NextResponse.json({success: 200, message: "OK"})
}