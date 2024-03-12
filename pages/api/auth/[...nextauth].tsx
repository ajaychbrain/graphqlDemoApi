import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "7f068ea9c234f54b2291",
      clientSecret: "1f5ed1136c53d1de945adf5e5e4ae9941663d90c",
    }),
  ],
};

export default NextAuth(authOptions);
