import '@/styles/tailwind.scss';
import DefaultLayout from '@/layouts/DefaultLayout';
import Script from 'next/script';
import GlobalProvider from '@/context/Global';
import { gql } from '@apollo/client';
import client from '@/apollo-client';


function MyApp({ Component, pageProps }) {

  return (
    <GlobalProvider>
      <DefaultLayout>
        <Component {...pageProps} />
        <Script src='https://unpkg.com/flowbite@1.3.4/dist/flowbite.js' strategy='beforeInteractive' />
      </DefaultLayout>
    </GlobalProvider>
  );
}

export default MyApp;
