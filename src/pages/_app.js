import '@/styles/tailwind.scss';
import Head from 'next/head';
import GlobalProvider from '@/context/Global';
import DefaultLayout from '@/layouts/DefaultLayout';
import 'swiper/css';
import web from '@/web';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Head>
        <title>{web.title}</title>
      </Head>

      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </GlobalProvider>
  );
}

export default MyApp;
