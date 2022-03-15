import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import client from '@/apollo-client';
import { classNames, clearObject } from '@/utils';
import { dynamicBlog } from '@/graphql/query/blog';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import BlogCard from '@/components/blog/BlogCard';

export async function getServerSideProps(context) {
  const search = context.query.search || '';
  const limit = parseInt(context.query.limit) || 12;
  const page = parseInt(context.query.page) || 1;
  const tags = context.query.tags || null;
  const author = context.query.author || null;

  const variables = {
    page, tags, author, search, limit
  };

  const query = gql(dynamicBlog(page, limit, tags, author, search));

  const { article, article_aggregated, article_tags } = (await client.query({
    query, variables
  })).data;

  const currentPage = page;
  const maxPages = Math.ceil(article_aggregated[0].count.id / limit);

  let available_tags = [];
  article_tags.map(item => available_tags = [...available_tags, ...item.group.tags]);
  available_tags = [...new Set(available_tags)];

  if (currentPage > maxPages) {
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/blog?page=${maxPages}&limit=${limit}`);
  }

  return {
    props: {
      blog: article, available_tags, page: {
        page, limit, tags, author, search, currentPage, maxPages
      }
    }
  };
}

export default function Index({ page, blog }) {
  const router = useRouter();
  const paths = [{ url: '/', label: 'home' }, { url: 'blog', label: 'blog', disabled: true }];

  const levelPosts = [blog.slice(0, 1), blog.slice(1, 3), blog.slice(3)];

  function searchPosts({
                         tags = page.tags,
                         author = page.author,
                         limit = page.limit,
                         nextPage = page.page,
                         search = page.search
                       }) {

    const query = {
      limit: limit != 12 ? limit : null, page: nextPage != page.currentPage ? nextPage : null, tags, search, author
    };

    router.push({
      pathname: '/blog', query: clearObject(query)
    });
  }

  return (<>
      {/*<HeadSeo title={page.page_title} description={page.page_description} />*/}
      <BannerBreadcrumb paths={paths}>
        <p
          className='text-5xl text-white text-center uppercase font-semibold'>{'Blog dos Alunos'}</p>
      </BannerBreadcrumb>
      <main>
        <Container>
          <div className='w-full space-y-16'>
            {levelPosts[0].map(post => <BlogCard key={`article-${post.id}`} post={post} horizontal={true} />)}
            {!!levelPosts[1].length && <div className='gap-8 grid grid-cols-1 md:grid-cols-2'>
              {levelPosts[1].map(post => (<BlogCard key={`article-${post.id}`} post={post} />))}
            </div>}
            {!!levelPosts[2].length && <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
              {levelPosts[2].map(post => (<BlogCard key={`article-${post.id}`} post={post} />))}
            </div>}

            <hr className='my-4 mx-auto px-12' />
            <nav aria-label='Navegação da Página' className='flex items-center justify-center w-full'>
              <ul className='inline-flex items-center -space-x-px'>
                <li className={classNames(page.page <= 1 && 'invisible')}>
                  <button onClick={() => searchPosts({ nextPage: page.currentPage + 1 })}
                          className={'block py-2.5 px-2 ml-0 leading-tight text-neutral-500 hover:text-white hover:bg-primary'}>
                    <span className='sr-only'>Previous</span>
                    <ChevronLeftIcon className='w-5 h-5' />
                  </button>
                </li>
                {[...Array(page.maxPages).keys()].map((item, index) => (<li key={'pages-' + index}>
                    <button onClick={() => searchPosts({ nextPage: index + 1 })}
                            className={classNames('py-2 px-3 leading-tight hover:text-white hover:bg-primary ', index + 1 == page.currentPage ? 'text-white bg-primary' : 'text-neutral-500')}>{index + 1}</button>
                  </li>))}
                <li className={classNames(page.page == page.maxPages && 'invisible')}>
                  <button onClick={() => searchPosts({ nextPage: page.currentPage - 1 })}
                          className='block py-2.5 px-2 leading-tight text-neutral-500 hover:text-white hover:bg-primary'>
                    <span className='sr-only'>Next</span>
                    <ChevronRightIcon className='w-5 h-5' />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </main>
    </>);
}