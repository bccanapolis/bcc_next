// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
};

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
