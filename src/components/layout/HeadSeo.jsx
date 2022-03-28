import Head from 'next/head';
import web from '@/web';
import { apiAsset } from '@/utils';
import { useRouter } from 'next/router';

export default function HeadSeo({ title, description, openGraph, keywords }) {
  const router = useRouter();
  const pageTitle = !!title ? `${web.title} | ${title}` : web.title;
  const pageDescription = !!description ? description : web.description;
  const pageOpenGraph = !!openGraph ?
    openGraph.id ?
      apiAsset(openGraph.id) + '.png' :
      `${web.url}${openGraph.url}` :
    `${web.url}/img/open_graph_full.png`;
  const pageOpenGraphHeight = !!openGraph ? openGraph.height : '1200';
  const pageOpenGraphWidth = !!openGraph ? openGraph.width : '628';
  const pageKeywords = !!keywords ? (keywords instanceof Array ? keywords.join(',') : keywords) : web.keywords;
  const pagePathName = `${web.url}${router.asPath}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name='title' content={pageTitle} />
      <meta name='description' content={pageDescription} />
      <meta name='keywords' content={pageKeywords} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={pagePathName} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageOpenGraph} />
      <meta property='og:image:height' content={pageOpenGraphHeight} />
      <meta property='og:image:width' content={pageOpenGraphWidth} />

      {/*<meta property='og:image' content={`${web.url}/img/open_graph_squared.png`} />*/}
      {/*<meta property='og:image:height' content='512' />*/}
      {/*<meta property='og:image:width' content='512' />*/}

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={pagePathName} />
      <meta property='twitter:title' content={pageTitle} />
      <meta property='twitter:description' content={pageDescription} />
      <meta property='twitter:image' content={pageOpenGraph} />
    </Head>
  );
}