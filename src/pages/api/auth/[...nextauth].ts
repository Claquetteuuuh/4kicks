import NextAuth from "next-auth/next";
import { Provider } from "next-auth/providers/index";
import GoogleProvider from "next-auth/providers/google";

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

const options = {
  providers: [
    GoogleProvider({
      clientId: (googleId)?googleId:"",
      clientSecret: (googleSecret)?googleSecret:"",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};

export default NextAuth(options);
