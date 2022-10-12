import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import client from '@/apollo-client';
import { apiAsset, clearObject, onlyUniqueObject } from '@/utils';
import { dynamicBlog } from '@/graphql/query/blog';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import ArticleCard from '@/components/article/ArticleCard';
import HeadSeo from '@/components/layout/HeadSeo';
import ArticlePanel from '@/components/article/ArticlePanel';
import ArticlePagination from '@/components/article/ArticlePagination';

export async function getServerSideProps(context) {
  const search = context.query.search || '';
  const limit = parseInt(context.query.limit) || 6;
  const page = parseInt(context.query.page) || 1;
  const tags = context.query.tags || null;
  const author = context.query.author || null;

  const variables = {
    page, tags, author, search, limit
  };

  if (!!author && !author.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi))
    return {
      redirect: {
        destination: '/blog'
      }
    };

  const query = gql(dynamicBlog(page, limit, tags, author, search, true));

  const { article, article_aggregated, article_tags, blog_page, recent_article } = (await client.query({
    query, variables
  })).data;

  const carousel = blog_page.hero_carousel ? blog_page.hero_carousel.map(item => ({
    url: apiAsset(item.directus_files_id.id),
    alt: item.directus_files_id.description,
    tags: item.directus_files_id.tags
  })) : [];

  const currentPage = page;
  const maxPages = Math.ceil(article_aggregated[0].count.id / limit);

  let available_tags = article_tags.map(({ name }) => name);
  let page_authors = onlyUniqueObject(article.map(({ user_created }) => user_created), 'id');

  if (currentPage > maxPages) {
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/blog?page=${maxPages}&limit=${limit}`);
  }

  return {
    props: {
      blog: article, available_tags, page_authors, recent_article, page: {
        ...blog_page,
        carousel, page, limit, tags, author, search, currentPage, maxPages
      }
    }
  };
}

export default function Index({
                                page,
                                blog,
                                available_tags: tags,
                                recent_article: recentPosts,
                                page_authors: pageAuthors
                              }) {
  const router = useRouter();
  const paths = [{ url: '/', label: 'home' }, { url: 'blog', label: 'blog', disabled: true }];

  let levelPosts = [[], [], blog];

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
      pathname: '/blog', query: clearObject(query)
    });
  }

  return (<>
    <HeadSeo title={page.seo_title} description={page.seo_description}
             openGraph={page.seo_image} keywords={page.seo_keywords} />
    <BannerBreadcrumb paths={paths} images={page.carousel}>
      <p
        className='text-5xl text-neutral-100 text-center uppercase font-semibold'>{page.hero_title || 'Hero Title'}</p>
    </BannerBreadcrumb>
    <Container className='flex flex-col-reverse lg:flex-row w-full gap-4 lg:gap-x-8'>
      <main className='w-full lg:w-8/12 2xl:w-9/12  space-y-8'>
        {!!levelPosts[2].length ? <div className='gap-8 grid grid-cols-1'>
            {levelPosts[2].map(post => (
                <ArticleCard key={`article-${post.id}`} horizontal={true} post={post} searchPosts={searchPosts} />
            ))}
          </div> :
          <div className='text-center'>
            <span className='text-primary'>OOPS</span>
            <h1 className='text-3xl font-bold'>Sem resultados.</h1>
            <p className='text-neutral-700 mt-4'>Não foi possível encontrar nenhum resultado que confere com a sua
              pesquisa.</p>
          </div>}
        {
          !!levelPosts[2].length &&
          <>
            <ArticlePagination searchPosts={searchPosts} page={page} />
          </>
        }
      </main>
      <ArticlePanel searchPosts={searchPosts} pageAuthors={pageAuthors} recentPosts={recentPosts} tags={tags}
                    className='w-full lg:w-4/12 2xl:w-3/12 ' />
    </Container>
  </>);
}