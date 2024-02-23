import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloclient";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
