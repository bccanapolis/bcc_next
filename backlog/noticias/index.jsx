import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import client from '@/apollo-client';
import { clearObject } from '@/utils';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import ArticlePanel from '@/components/article/ArticlePanel';
import ArticlePagination from '@/components/article/ArticlePagination';
import { dynamicNews } from '@/graphql/query/noticias';
import ArticleCardHome from '@/components/article/ArticleCardHome';

export async function getServerSideProps(context) {
  const search = context.query.search || '';
  const limit = parseInt(context.query.limit) || 6;
  const page = parseInt(context.query.page) || 1;

  const variables = {
    page, search, limit
  };

  const query = gql(dynamicNews(page, limit, search, true));

  const { news, news_aggregated, noticias_page, recent_news } = (await client.query({
    query, variables
  })).data;

  const carousel = noticias_page.hero_carousel ? noticias_page.hero_carousel.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description,
    tags: item.directus_files_id.tags
  })) : [];

  const currentPage = page;
  const maxPages = Math.ceil(news_aggregated[0].count.id / limit) || 1;

  if (currentPage > maxPages) {
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/noticias?page=${maxPages}&limit=${limit}`);
  }

  return {
    props: {
      news, recent_news, page: {
        ...noticias_page, carousel, page, limit, search, currentPage, maxPages
      }
    }
  };
}

export default function Index({
                                page,
                                news,
                                recent_news: recentPosts
                              }) {
  const router = useRouter();
  const paths = [{ url: '/', label: 'home' }, { url: '/noticias', label: 'noticias', disabled: true }];

  let levelPosts = [[], [], news];

  function searchPosts({
                         tags = page.tags,
                         author = page.author,
                         limit = page.limit,
                         nextPage = page.page,
                         search = page.search
                       }) {

    const query = {
      limit: limit != 6 ? limit : null,
      page: nextPage != page.currentPage ? nextPage : null,
      tags: tags == router.query.tags ? null : tags,
      search, author
    };

    router.push({
      pathname: '/noticias', query: clearObject(query)
    });
  }

  return (<>
    {/*<HeadSeo title={page.seo_title} description={page.seo_description}*/}
    {/*         openGraph={page.seo_image} keywords={page.seo_keywords} />*/}
    <BannerBreadcrumb paths={paths} images={page.carousel}>
      <p
        className='text-5xl text-white text-center uppercase font-semibold'>{page.hero_title || 'Hero Title'}</p>
    </BannerBreadcrumb>
    <Container className='flex flex-col-reverse lg:flex-row w-full gap-4 lg:gap-x-8'>
      <main className='w-full lg:w-8/12 2xl:w-9/12 space-y-8'>
        {!!levelPosts[2].length ? <div className='gap-8 grid grid-cols-1 md:grid-cols-2'>
            {levelPosts[2].map(post => (
              <ArticleCardHome isNews={true} key={`article-${post.id}`} post={post} />))}
          </div> :
          <div className='text-center'>
            <span className='text-primary'>OOPS</span>
            <h1 className='text-3xl font-bold'>Sem resultados.</h1>
            <p className='text-neutral-600 mt-4'>Não foi possível encontrar nenhum resultado que confere com a sua
              pesquisa.</p>
          </div>}
        {
          !!levelPosts[2].length &&
          <>
            <ArticlePagination searchPosts={searchPosts} page={page} />
          </>
        }
      </main>
      <ArticlePanel searchPosts={searchPosts} recentPosts={recentPosts}
                    className='w-full lg:w-4/12 2xl:w-3/12 ' isNews={true} />
    </Container>
  </>);
}