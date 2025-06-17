// import Head from "next/head";
// import React from "react";
// import "../styles/globals.css";
// import { AppProps } from "next/app";



// const App = ({ Component, pageProps }: AppProps) => (
//   <>
//     <Head>
//       <meta
//         name="viewport"
//         content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
//       />
//     </Head>
//     <Component {...pageProps} />;
//   </>
// );

// export default App;

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { SearchProvider } from '@/lib/context/SearchContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchProvider>
  )
}
