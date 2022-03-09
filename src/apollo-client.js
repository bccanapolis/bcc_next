// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  }
};

const client = new ApolloClient({
  uri: 'https://api.bcc.anapolis.ifg.edu.br/graphql',
  cache: new InMemoryCache(),
  defaultOptions
});

export default client;