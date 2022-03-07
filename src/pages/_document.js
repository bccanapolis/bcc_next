import { Head, Html, Main, NextScript } from 'next/document';
import web from '@/web';

export default function Document() {

  return (<Html className='scroll-smooth'>
      <Head>
        <meta name='title' content={web.title} />
        <meta name='description' content={web.description} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={web.url} />
        <meta property='og:title' content={web.title} />
        <meta property='og:description' content={web.description} />
        <meta property='og:image' content={`${web.url}img/open_graph_full.png`} />
        <meta property='og:image:height' content='1200' />
        <meta property='og:image:width' content='628' />

        <meta property='og:image' content={`${web.url}img/open_graph_squared.png`} />
        <meta property='og:image:height' content='512' />
        <meta property='og:image:width' content='512' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={web.url} />
        <meta property='twitter:title' content={web.title} />
        <meta property='twitter:description' content={web.description} />
        <meta property='twitter:image' content={`${web.url}img/open_graph_full.png`} />

        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet' />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}