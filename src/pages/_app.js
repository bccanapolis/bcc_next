import '@/src/styles/tailwind.scss';
import DefaultLayout from '@/src/layouts/DefaultLayout';
import Script from 'next/script';
import GlobalProvider from '@/src/context/Global';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Head>
        <title>Ciência da Computação - IFG Anápolis</title>
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
        <Script src='https://unpkg.com/flowbite@1.3.4/dist/flowbite.js' strategy='beforeInteractive' />
      </DefaultLayout>
    </GlobalProvider>
  );
}

export default MyApp;
