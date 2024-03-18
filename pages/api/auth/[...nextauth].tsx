import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "7f068ea9c234f54b2291",
      clientSecret: "29e1dbad392ce67958a2e81d6e29744fe374f07c",
    }),
  ],
};

export default NextAuth(authOptions);
