import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "@/middleware";
import * as jose from "jose";

export const withConnection: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    
    const pathname = req.nextUrl.pathname;
    
    if (["/api/users/"]?.some((path) => pathname.startsWith(path))) {
      let authorizedHosts = [`www.${process.env.HOST}`, process.env.HOST];
      
      console.log("BLZLZLL")
      if (process.env.NODE_ENV === "development") {
        authorizedHosts.push("localhost:3000");
      }

      const host = req.headers.get("host") as string;
      if (authorizedHosts.includes(host)) {
        const encryptedEmail = req.headers.get("token");
        const client_key = process.env.client_jwt_key;

        if (client_key && encryptedEmail) {
          const { payload, protectedHeader } = await jose.jwtVerify(
            encryptedEmail,
            new TextEncoder().encode(client_key)
          );
          const email = payload.email as string;
          const { exp } = payload;
          if (exp && email) {
            if (Date.now() > exp * 1000) {
              return NextResponse.json(
                {
                  error: "Token expired",
                },
                {
                  status: 403,
                }
              );
            } else {
              const requestHeaders = new Headers(req.headers);
              requestHeaders.set("email", email);
              return NextResponse.next({
                request: {
                  headers: requestHeaders,
                },
              });
            }
          } else {
            return NextResponse.json({
              status: 400,
              message: "information missing in token !",
            });
          }
        } else {
          return NextResponse.json({
            status: 400,
            message: "information missing !",
          });
        }
      } else {
        return NextResponse.json({
          status: 403,
          message: "Cannot access from this host !",
        });
      }
    }
  };
};
