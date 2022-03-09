import '@/styles/tailwind.scss';
import Head from 'next/head';
import GlobalProvider from '@/context/Global';
import DefaultLayout from '@/layouts/DefaultLayout';
import 'swiper/css';
import web from '@/web';
import * as ga from '@/lib/ga';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
