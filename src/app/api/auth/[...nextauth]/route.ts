import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../../lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(
            "Une des deux informations de connection est manquante ! C-004"
          );
        }
        const user = await prisma.account.findUnique({
          where: {
            email: credentials?.email,
            connection_type: "EMAIL",
          },
        });
        if (user) {
          if (!user.password) {
            throw new Error("Probleme de code C-001, contactez le support");
          }
          const goodPassword = await bcrypt.compare(
            credentials?.password,
            user.password
          );
          if(!goodPassword){
            throw new Error("Une des informations de connection est errone, C-003");
          }
          return {
            id: user.account_uid,
            email: user.email,
            name: user.username,
          };
        } else {
            throw new Error("Une des informations de connection est errone, C-002");
        }
      },
    }),
  ],
  secret: process.env.NEXT_JWT_SECRET,
  pages: {
    error: "/login",
    signIn: "/login",
  },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
