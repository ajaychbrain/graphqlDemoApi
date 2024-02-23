import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api", // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;
