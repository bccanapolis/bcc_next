import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import client from '@/apollo-client';
import { apiAsset, classNames, clearObject } from '@/utils';
import Link from 'next/link';
import { dynamicBlog } from '@/graphql/query/blog';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const search = context.query.search || '';
  const limit = parseInt(context.query.limit) || 12;
  const page = parseInt(context.query.page) || 1;
  const tags = context.query.tags || null;
  const author = context.query.author || null;

  const variables = {
    page, tags, author, search,
    limit: (page == 1 && !tags && !author && !search) ? limit + 1 : limit
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
      blog: article,
      available_tags,
      page: {
        page,
        limit,
        tags,
        author,
        search,
        currentPage,
        maxPages
      }
    }
  };
}

export default function Index({ page, blog }) {
  const router = useRouter();
  const paths = [
    { url: '/', label: 'home' },
    { url: 'blog', label: 'blog', disabled: true }
  ];

  let featuredPost = null;
  let articles = blog;

  if (!page.tags && !page.author && !page.search && page.limit > 1 && page.page == 1) {
    featuredPost = blog.slice(0, 1)[0];
    articles = blog.slice(1);
  }

  function searchPosts({
                         tags = page.tags,
                         author = page.author,
                         limit = page.limit,
                         nextPage = page.page,
                         search = page.search
                       }) {

    const query = {
      limit: limit != 12 ? limit : null,
      page: nextPage != page.currentPage ? nextPage : null,
      tags,
      search,
      author
    };

    router.push({
      pathname: '/blog',
      query: clearObject(query)
    });
  }

  return (
    <>
      {/*<HeadSeo title={page.page_title} description={page.page_description} />*/}
      <BannerBreadcrumb paths={paths}>
        <p
          className='text-5xl text-white text-center uppercase font-semibold'>{'Blog da Computação'}</p>
      </BannerBreadcrumb>
      <main>
        {
          !!featuredPost &&
          <Container>
            <article
              className='flex flex-col w-full h-full md:flex-row bg-white group'>
              <Link href={`/blog/${featuredPost.slug}@${featuredPost.id}`}>
                <a className='w-full h-64 md:h-auto md:min-h-[18rem] md:w-7/12'>
                  <div className='w-full h-full relative'>
                    <Image
                      className='object-cover hover:opacity-80 transition-opacity duration-300'
                      src={apiAsset(featuredPost.cover.id)} alt=''
                      layout='fill'
                    />
                  </div>
                </a>
              </Link>
              <div className='flex md:w-5/12 flex-col justify-between p-4 leading-normal'>
                <div>
                  <Link href={`/blog/${featuredPost.slug}@${featuredPost.id}`}>
                    <a>
                      <h5 className='mb-2 text-xl font-bold tracking-tight'>{featuredPost.title}</h5>
                    </a>
                  </Link>
                  <p className='mb-3 font-normal text-neutral-700'>{featuredPost.description}</p>
                </div>
                <div>
                  <hr className='my-2' />
                  <div className='flex justify-between items-center'>
                    <button onClick={() => searchPosts({ author: featuredPost.user_created.id })}
                            className='inline-flex items-center space-x-2'>
                      <div className='relative w-10 h-10 inline-block rounded-full'>
                        <Image
                          src={apiAsset(featuredPost.user_created.avatar.id)} className='object-cover rounded-full'
                          layout='fill' />
                      </div>
                      <div className='inline-block text-left'>
                        <p
                          className='text-sm font-medium'>{`${featuredPost.user_created.first_name} ${featuredPost.user_created.last_name}`}</p>
                        <p className='text-xs'>{featuredPost.user_created.title}</p>
                      </div>
                    </button>

                    <ul className='inline-flex gap-x-1 items-baseline'>
                      {
                        !!featuredPost.tags &&
                        featuredPost.tags.map(item => (
                          <li key={`tag-post-${featuredPost.slug}-${item}`}>
                            <button onClick={() => searchPosts({ tags: item })}
                                    className='text-xs text-neutral-500 bg-primary/20 px-1 py-0.5 hover:text-primary  hover:bg-primary/30 transition-colors duration-300'>{item}</button>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </Container>
        }
        {
          !!articles.length &&
          <Container className='flex flex-col-reverse flex-col lg:flex-row gap-x-4 divide-x-2 divide-neutral-50'>
            <div className='w-full'>
              <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                {
                  articles.map(post => (
                    <article key={`article-${post.id}`}
                             className='flex flex-col w-full bg-white group'>
                      <Link href={`/blog/${post.slug}@${post.id}`}>
                        <a>
                          <div className='overflow-hidden w-full h-64 relative'>
                            <Image
                              className='object-cover hover:opacity-80 transition-opacity duration-300'
                              src={apiAsset(post.cover.id)} alt=''
                              layout='fill'
                            />
                          </div>
                        </a>
                      </Link>
                      <div className='flex flex-1 flex-col justify-between p-4 leading-normal'>
                        <div>
                          <Link href={`/blog/${post.slug}@${post.id}`}>
                            <a>
                              <h5 className='mb-2 text-xl font-bold tracking-tight'>{post.title}</h5>
                            </a>
                          </Link>
                          <p className='mb-3 font-normal text-neutral-700'>{post.description}</p>
                        </div>
                        <div>
                          <hr className='my-2' />
                          <div className='flex justify-between items-center'>
                            <button onClick={() => searchPosts({ author: post.user_created.id })}
                                    className='inline-flex items-center space-x-2'>
                              <div className='relative w-10 h-10 inline-block rounded-full'>
                                <Image
                                  src={apiAsset(post.user_created.avatar.id)} className='object-cover rounded-full'
                                  layout='fill' />
                              </div>
                              <div className='inline-block text-left'>
                                <p
                                  className='text-sm font-medium'>{`${post.user_created.first_name} ${post.user_created.last_name}`}</p>
                                <p className='text-xs'>{post.user_created.title}</p>
                              </div>
                            </button>

                            <ul className='inline-flex gap-x-1 items-baseline'>
                              {
                                !!post.tags &&
                                post.tags.map(item => (
                                  <li key={`tag-post-${post.slug}-${item}`}>
                                    <button onClick={() => searchPosts({ tags: item })}
                                            className='text-xs text-neutral-500 bg-primary/20 px-1 py-0.5 hover:text-primary  hover:bg-primary/30 transition-colors duration-300'>{item}</button>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                }

              </div>
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
                  {
                    [...Array(page.maxPages).keys()].map((item, index) => (
                      <li key={'pages-' + index}>
                        <button onClick={() => searchPosts({ nextPage: index + 1 })}
                                className={classNames('py-2 px-3 leading-tight hover:text-white hover:bg-primary ', index + 1 == page.currentPage ? 'text-white bg-primary' : 'text-neutral-500')}>{index + 1}</button>
                      </li>
                    ))
                  }
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
        }
      </main>
    </>
  );
}