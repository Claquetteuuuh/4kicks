import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const { username, first_name, last_name, password, preference } =
    await req.json();
  const email = req.headers.get("email");

  const user = await prisma.account.findUnique({
    where: {
      email: email as string,
      completed: false,
    },
  });
  if (user) {
    const hashedPasswd = await bcrypt.hash(password, 10);
    const updated = await prisma.account.update({
      where: {
        email: email as string,
      },
      data: {
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: hashedPasswd,
        preference: preference,
        completed: true,
      },
    })
    if(updated){
      return NextResponse.json({
        status: 201,
        message: "User updated successfully !",
      });
    }else{
      return NextResponse.json({
        status: 400,
        error: "Cannot update user"
      })
    }
  } else {
    const existUser = await prisma.account.findUnique({
      where: {
        email: email as string,
      },
    });
    if (existUser) {
      return NextResponse.json({
        status: 400,
        error: "Account already completed, C-005",
      });
    }
    const newUser = await prisma.account.create({
      data: {
        email: email as string,
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        preference: preference,
        completed: true,
      },
    });
    if (!newUser) {
        return NextResponse.json({
            status: 400,
            error: "Error in creation of account ! C-006"
        })
    }
    return NextResponse.json({
      status: 201,
      message: `User created: ${newUser.email}`,
    });
  }
};
