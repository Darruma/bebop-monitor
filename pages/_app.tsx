import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
import { AppProps } from 'next/app';
import "../styles/globals.css"
import Header from '../components/Header';
import Head from 'next/head';
import { PricesProvider } from '../context/prices';
function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <PricesProvider>

        <Head>
          <title>Bebop Monitor</title>
          <meta name="description" content="Bebop Event Monitor" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <Header>
          <Component {...pageProps} />
        </Header>

      </PricesProvider>
    </ApolloProvider>
  )
}

export default App;