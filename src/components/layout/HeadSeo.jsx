import Head from 'next/head';
import web from '@/web';
import { apiAsset } from '@/utils';

export default function HeadSeo({ title, description, openGraph }) {
  const pageTitle = !!title ? `${web.title} | ${title}` : web.title;
  const pageDescription = !!description ? description : web.description;
  const pageOpenGraph = !!openGraph ? apiAsset(openGraph) : `${web.url}img/open_graph_full.png`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name='title' content={pageTitle} />
      <meta name='description' content={pageDescription} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={web.url} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageOpenGraph} />
    </Head>
  );
}