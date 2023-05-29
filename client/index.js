import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { onError } from 'apollo-link-error';
const isProd = process.env.NODE_ENV === 'production';
import App from './components/App';


const httpLink = new HttpLink({
  uri: isProd ? '/graphql' : `http://${process.env.DEV_HOST}:${process.env.DEV_PORT}/graphql`,
});

const cache = new InMemoryCache();

const authLink = new ApolloLink((operation, forward) => {

  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers = { ...headers, 'x-token': token };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {

  if (graphQLErrors) {
    graphQLErrors.forEach(error => {
      if (error.error.extensions.code === 'UNAUTHENTICATED') {
        localStorage.removeItem('token')
      }
      console.log(
        `[GraphQL error]`, error
      );
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const link = ApolloLink.from([authLink, errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
  // resolvers,
  // typeDefs
});

const ClientApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default ClientApp;

