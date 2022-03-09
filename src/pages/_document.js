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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}