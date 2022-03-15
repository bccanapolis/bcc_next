import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@heroicons/react/outline';
import client from '@/apollo-client';
import { apiAsset, classNames, clearObject } from '@/utils';
import Link from 'next/link';
import { dynamicBlog } from '@/graphql/query/blog';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

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

export default function index({ page, blog, available_tags }) {
  const router = useRouter();
  const formRef = useRef();

  const [querySearch, setQuerySearch] = useState(page.search);
  const [queryTag, setQueryTag] = useState(page.tags);
  const [queryLimit, setQueryLimit] = useState(page.limit);

  const available_limits = [1, 2, 3, 6, 12, 16, 20, 24, 30];

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

  function submitForm() {
    formRef.current.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  }

  function _handleKeyDown(e) {
    if (e.key === 'Enter') submitForm();
  }

  useEffect(() => {
    if (!!queryTag) {
      submitForm();
    }
    if (!!queryLimit) {
      submitForm();
    }
  }, [queryTag, queryLimit]);

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
        <Container>
          <form ref={formRef} onSubmit={(e) => {
            e.preventDefault();
            searchPosts({
              search: querySearch,
              tags: queryTag,
              limit: queryLimit
            });
          }}>
            <div className='relative w-64'>
              <label htmlFor='query-search'
                     className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                <SearchIcon className='w-5 h-5 text-neutral-500' />
              </label>
              <input type='search' id='query-search'
                     className='bg-neutral-50 text-neutral-900 border-0 focus:outline-none placeholder:text-neutral-300 block w-full pl-10 p-2.5'
                     placeholder='postgres'
                     value={querySearch}
                     onKeyDown={_handleKeyDown}
                     onInput={(el) => setQuerySearch(el.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor='query-tags' className='mb-2 text-sm font-medium text-neutral-900'>Tags</label>
              <select id='query-tags'
                      className='bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-6 uppercase'
                      value={queryTag}
                      onChange={(el) => {
                        setQueryTag(el.currentTarget.value);
                      }}>
                <option className='uppercase' value={''}>nenhum</option>
                {
                  available_tags.map(item => <option className='uppercase' key={item}>{item}</option>)
                }
              </select>
            </div>
            <div>
              <label htmlFor='query-limit' className='mb-2 text-sm font-medium text-neutral-900'>Tags</label>
              <select id='query-limit'
                      className='bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-6'
                      value={queryLimit}
                      onChange={(el) => {
                        setQueryLimit(el.currentTarget.value);
                      }}>

                {
                  available_limits.map(item => <option key={item}>{item}</option>)
                }
              </select>
            </div>
          </form>
        </Container>

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
                            {/*<Link href={`/blog/${post.slug}@${post.id}`}>*/}
                            {/*  <a*/}
                            {/*    className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary/80 hover:bg-primary'>*/}
                            {/*    Read more*/}
                            {/*    <ArrowRightIcon className='ml-2 -mr-1 w-4 h-4' />*/}
                            {/*  </a>*/}
                            {/*</Link>*/}
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

            {/*<aside className='lg:float-right w-full lg:w-3/12' aria-label='Sidebar'>*/}
            {/*  <div className='overflow-y-auto px-3 rounded'>*/}
            {/*    <ul className='space-y-2'>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700'>*/}
            {/*          <span className='ml-3'>Dashboard</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700'>*/}
            {/*          <span className='flex-1 ml-3 whitespace-nowrap'>Kanban</span>*/}
            {/*          <span*/}
            {/*            className='inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-neutral-800 bg-neutral-200 rounded-full dark:bg-neutral-700 dark:text-neutral-300'>Pro</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700'>*/}
            {/*          <span className='flex-1 ml-3 whitespace-nowrap'>Inbox</span>*/}
            {/*          <span*/}
            {/*            className='inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200'>3</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700'>*/}
            {/*          <span className='flex-1 ml-3 whitespace-nowrap'>Users</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700'>*/}
            {/*          <span className='flex-1 ml-3 whitespace-nowrap'>Products</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700'>*/}
            {/*          <span className='flex-1 ml-3 whitespace-nowrap'>Sign In</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700'>*/}
            {/*          <span className='flex-1 ml-3 whitespace-nowrap'>Sign Up</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*    </ul>*/}
            {/*    <ul className='pt-4 mt-4 space-y-2 border-t border-neutral-200 dark:border-neutral-700'>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg transition duration-75 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-white group'>*/}
            {/*          <span className='ml-4'>Upgrade to Pro</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg transition duration-75 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-white group'>*/}
            {/*          <span className='ml-3'>Documentation</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg transition duration-75 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-white group'>*/}
            {/*          <span className='ml-3'>Components</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='#'*/}
            {/*           className='flex items-center p-2 text-base font-normal text-neutral-900 rounded-lg transition duration-75 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-white group'>*/}

            {/*          <span className='ml-3'>Help</span>*/}
            {/*        </a>*/}
            {/*      </li>*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*</aside>*/}
          </Container>
        }
      </main>


    </>
  );
}