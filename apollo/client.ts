import { ApolloClient, InMemoryCache } from '@apollo/client'
export const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/darruma/bebop',
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy:'cache-and-network'
      }
    },
    queryDeduplication: true,
  })