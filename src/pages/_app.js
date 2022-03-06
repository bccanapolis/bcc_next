import '@/styles/tailwind.scss';
import Script from 'next/script';
import Head from 'next/head';
import GlobalProvider from '@/context/Global';
import DefaultLayout from '@/layouts/DefaultLayout';
// Import Swiper styles
import 'swiper/css';

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
