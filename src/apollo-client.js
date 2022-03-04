// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.bcc.anapolis.ifg.edu.br/graphql',
  cache: new InMemoryCache()
})

export default client