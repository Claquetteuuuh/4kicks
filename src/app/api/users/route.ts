import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  let authorizedHost = process.env.HOST;
  if (process.env.NODE_ENV === "development") {
    authorizedHost = "localhost:3000";
  }
  if (req.headers.get("host") == authorizedHost) {
    const encryptedEmail = req.headers.get("token");
    const client_key = process.env.client_jwt_key;

    if (client_key && encryptedEmail) {
      try {
        const { exp, email } = jwt.verify(
          encryptedEmail,
          client_key
        ) as JwtPayload;
        if (exp) {
          if (Date.now() > exp * 1000) {
            return NextResponse.json(
              {
                error: "Token expired",
              },
              {
                status: 400,
              }
            );
          }
        }
        const prisma = new PrismaClient();
        const user = await prisma.account.findUnique({
          where: {
            email: email,
          },
        });
        if (user) {
          return NextResponse.json(
            {
              completed: user.completed,
            },
            {
              status: 200,
            }
          );
        } else {
          return NextResponse.json(
            {
              completed: false,
            },
            {
              status: 200,
            }
          );
        }
      } catch (err: any) {
        console.error(err);
        return NextResponse.json(
          {
            error: "Serverside error",
          },
          {
            status: 500,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          error: "Serverside error",
        },
        {
          status: 500,
        }
      );
    }
  }

  return NextResponse.json(
    {
      error: "You don't have the permission",
    },
    {
      status: 403,
    }
  );
}

export async function POST(req: NextRequest) {
  let authorizedHost = process.env.HOST;
  if (process.env.NODE_ENV === "development") {
    authorizedHost = "localhost:3000";
  }
  if (req.headers.get("host") == authorizedHost) {
    const encryptedEmail = req.headers.get("token");
    const client_key = process.env.client_jwt_key;
    
    if (client_key && encryptedEmail) {
      try {
        const { exp, email } = jwt.verify(
          encryptedEmail,
          client_key
        ) as JwtPayload;
        if (exp) {
          if (Date.now() > exp * 1000) {
            return NextResponse.json(
              {
                error: "Token expired",
              },
              {
                status: 400,
              }
            );
          }
        }
        const data = await req.json();
        const { username, first_name, last_name, password, preference, promo } = data;

        console.log(username);
        console.log(first_name);
        console.log(last_name);
        console.log(password);
        console.log(preference);
        console.log(promo);
        console.log(email);

        return NextResponse.json({ message: "Nickel" }, { status: 200 });
      } catch (err) {
        console.error(err);

        return NextResponse.json(
          {
            error: "Serverside error",
          },
          {
            status: 500,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          error: "Serverside error",
        },
        {
          status: 500,
        }
      );
    }
  }
  return NextResponse.json(
    {
      error: "You don't have the permission",
    },
    {
      status: 403,
    }
  );
}
