import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloclient";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  console.log(pageProps, "pageProps");
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
