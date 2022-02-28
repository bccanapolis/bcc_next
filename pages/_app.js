import '@/styles/tailwind.scss';
import DefaultLayout from '@/layouts/DefaultLayout';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
      <Script src='https://unpkg.com/flowbite@1.3.4/dist/flowbite.js' strategy='beforeInteractive' />
    </DefaultLayout>
  );
}

export default MyApp;
