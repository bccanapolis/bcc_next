import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import client from '@/apollo-client';
import { clearObject } from '@/utils';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { dynamicNews } from '@/graphql/query/noticias';
import NewsCard from '@/components/news/NewsCard';
import ArticlePagination from '@/components/article/ArticlePagination';
import NewsPanel from '@/components/news/NewsPanel';

export async function getServerSideProps(context) {
  const search = context.query.search || '';
  const limit = parseInt(context.query.limit) || 6;
  const page = parseInt(context.query.page) || 1;

  const variables = {
    page,
    search,
    limit,
  };

  const query = gql(dynamicNews(page, limit, search));

  const { recent_news, news, news_aggregated, featured_news } = (
    await client.query({
      query,
      variables,
    })
  ).data;

  const currentPage = page;
  const maxPages = Math.ceil(news_aggregated[0].count.id / limit);

  if (currentPage > maxPages) {
    context.res.statusCode = 302;
    context.res.setHeader(
      'Location',
      `/notificas?page=${maxPages}&limit=${limit}`
    );
  }

  return {
    props: {
      news,
      recent_news,
      featured_news,
      page: {
        page,
        limit,
        search,
        currentPage,
        maxPages,
      },
    },
  };
}

export default function Index({ page, recent_news, featured_news, news }) {
  const router = useRouter();
  const paths = [
    { url: '/', label: 'home' },
    { url: 'noticias', label: 'noticias', disabled: true },
  ];

  let levelPosts = [[], [], news];

  function searchPosts({
    limit = page.limit,
    nextPage = page.page,
    search = page.search,
  }) {
    const query = {
      limit: limit != 6 ? limit : null,
      page: nextPage != page.currentPage ? nextPage : null,
      search,
    };

    router.push({
      pathname: '/noticias',
      query: clearObject(query),
    });
  }

  return (
    <>
      {/*<HeadSeo title={page.seo_title} description={page.seo_description}*/}
      {/*         openGraph={page.seo_image} keywords={page.seo_keywords} />*/}
      <BannerBreadcrumb paths={paths} images={page.carousel}>
        <p className="text-5xl text-neutral-100 text-center uppercase font-semibold">
          {page.hero_title || 'Noticias'}
        </p>
      </BannerBreadcrumb>
      <Container className="flex flex-col-reverse lg:flex-row w-full gap-4 lg:gap-x-8">
        <main className="w-full lg:w-8/12 2xl:w-9/12  space-y-8">
          {!!levelPosts[2].length ? (
            <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
              {levelPosts[2].map((post) => (
                <NewsCard
                  key={`article-${post.id}`}
                  horizontal={true}
                  post={post}
                  searchPosts={searchPosts}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <span className="text-primary">OOPS</span>
              <h1 className="text-3xl font-bold">Sem resultados.</h1>
              <p className="text-neutral-700 mt-4">
                Não foi possível encontrar nenhum resultado que confere com a
                sua pesquisa.
              </p>
            </div>
          )}
          {!!levelPosts[2].length && (
            <>
              <ArticlePagination searchPosts={searchPosts} page={page} />
            </>
          )}
        </main>
        <NewsPanel
          searchPosts={searchPosts}
          featuredNews={featured_news}
          recentPosts={recent_news}
          className="w-full lg:w-4/12 2xl:w-3/12 "
        />
      </Container>
    </>
  );
}
