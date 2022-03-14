import BannerBreadcrumb from '@/components/BannerBreadcrumb';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import client from '@/apollo-client';
import { apiAsset, classNames } from '@/utils';
import Link from 'next/link';
import { queryBlog, queryBlogTags } from '@/graphql/query/blog';

export async function getServerSideProps(context) {
  const variables = {
    page: parseInt(context.query.page) || 1,
    limit: parseInt(context.query.limit) || 10,
    tags: context.query.tags || ''
  };

  const query = !!variables.tags ? queryBlogTags : queryBlog;

  const { article, article_aggregated } = (await client.query({
    query, variables
  })).data;

  const currentPage = variables.page;
  const maxPages = Math.ceil(article_aggregated[0].count.id / variables.limit);

  if (currentPage > maxPages) {
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/blog?page=${maxPages}&limit=${variables.limit}`);
  }

  return {
    props: {
      blog: article,
      page: {
        ...variables,
        currentPage,
        maxPages
      }
    }
  };
}

export default function index({ page, blog }) {
  const paths = [
    { url: '/', label: 'home' },
    { url: 'blog', label: 'blog', disabled: true }
  ];

  return (
    <>
      {/*<HeadSeo title={page.page_title} description={page.page_description} />*/}
      <BannerBreadcrumb paths={paths}>
        <p
          className='text-5xl text-white text-center uppercase font-semibold'>{'Blog da Computação'}</p>
      </BannerBreadcrumb>
      <Container className='flex flex-col-reverse flex-col lg:flex-row gap-x-4 divide-x-2 divide-gray-50'>
        <div className='w-full lg:w-9/12'>
          <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 '>
            {
              blog.map(post => (
                <article key={`article-${post.id}`}
                         className='flex flex-col w-full bg-white lg:flex-row group'>
                  <Link href={`/blog/${post.slug}@${post.id}`}>
                    <a>
                      <div className='overflow-hidden w-full h-64 lg:h-full lg:min-h-[18rem] lg:w-96 relative'>
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
                      <p className='mb-3 font-normal text-gray-700'>{post.description}</p>
                    </div>
                    <div>
                      <hr className='my-2' />
                      <div className='flex justify-between items-center'>
                        <div className='inline-flex items-center space-x-2'>
                          <div className='relative w-10 h-10 inline-block rounded-full'>
                            <Image
                              src={apiAsset(post.user_created.avatar.id)} className='object-cover rounded-full'
                              layout='fill' />
                          </div>
                          <div className='inline-block'>
                            <p
                              className='text-sm font-medium'>{`${post.user_created.first_name} ${post.user_created.last_name}`}</p>
                            <p className='text-xs'>{post.user_created.title}</p>
                          </div>
                        </div>

                        <ul className='inline-flex gap-x-1 items-baseline'>
                          {
                            !!post.tags &&
                            post.tags.map(item => (
                              <li key={`tag-post-${post.slug}-${item}`}>
                                <Link
                                  href={`/blog?page=${page.page}&limit=${page.limit}&tags=${item}`}>
                                  <a
                                    className='text-xs text-gray-500 bg-primary/20 px-1 py-0.5 hover:text-primary  hover:bg-primary/30 transition-colors duration-300'>{item}</a>
                                </Link>
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
                <Link disabled href={`/blog?page=${page.currentPage - 1}&limit=${page.limit}`}>
                  <a
                    className={'block py-2.5 px-2 ml-0 leading-tight text-gray-500 hover:text-white hover:bg-primary'}>
                    <span className='sr-only'>Previous</span>
                    <ChevronLeftIcon className='w-5 h-5' />
                  </a>
                </Link>
              </li>
              {
                [...Array(page.maxPages).keys()].map((item, index) => (
                  <li key={'pages-' + index}>
                    <Link href={`/blog?page=${index + 1}&limit=${page.limit}`}>
                      <a
                        className={classNames('py-2 px-3 leading-tight hover:text-white hover:bg-primary ', index + 1 == page.currentPage ? 'text-white bg-primary' : 'text-gray-500')}>{index + 1}</a>
                    </Link>
                  </li>
                ))
              }
              <li className={classNames(page.page == page.maxPages && 'hidden')}>
                <Link href={`/blog?page=${page.currentPage + 1}&limit=${page.limit}`}>
                  <a
                    className='block py-2.5 px-2 leading-tight text-gray-500 hover:text-white hover:bg-primary'>
                    <span className='sr-only'>Next</span>
                    <ChevronRightIcon className='w-5 h-5' />
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <aside className='lg:float-right w-full lg:w-3/12' aria-label='Sidebar'>
          <div className='overflow-y-auto px-3 rounded'>
            <ul className='space-y-2'>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <span className='ml-3'>Dashboard</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <span className='flex-1 ml-3 whitespace-nowrap'>Kanban</span>
                  <span
                    className='inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300'>Pro</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <span className='flex-1 ml-3 whitespace-nowrap'>Inbox</span>
                  <span
                    className='inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200'>3</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <span className='flex-1 ml-3 whitespace-nowrap'>Users</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <span className='flex-1 ml-3 whitespace-nowrap'>Products</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <span className='flex-1 ml-3 whitespace-nowrap'>Sign In</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <span className='flex-1 ml-3 whitespace-nowrap'>Sign Up</span>
                </a>
              </li>
            </ul>
            <ul className='pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700'>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
                  <span className='ml-4'>Upgrade to Pro</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
                  <span className='ml-3'>Documentation</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
                  <span className='ml-3'>Components</span>
                </a>
              </li>
              <li>
                <a href='#'
                   className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>

                  <span className='ml-3'>Help</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </Container>

    </>
  );
}