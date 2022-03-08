import '@/styles/tailwind.scss';
import Head from 'next/head';
import Script from 'next/script';
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
      <Script strategy='eager'
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script strategy='eager'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
        `}
      </Script>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </GlobalProvider>
  );
}

export default MyApp;
