import { classNames } from '@/utils';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';

let t = null;

function PanelChild({
                      recentPosts,
                      featuredNews,
                      close,
                      isNews
                    }) {
  const router = useRouter();
  const queryTag = router.query.tags;
  const route = isNews ? '/noticias' : '/blog';

  useEffect(() => {
    router.events.on('routeChangeComplete', close);
  }, []);

  return (
    <>
      <div className='flex flex-col gap-8'>
        {
          featuredNews.length ? (
            <div className='space-y-2'>
          <span className='inline-flex justify-center px-4 py-4 w-full bg-primary text-neutral-100 font-bold'>
            Noticias Em Destaque
          </span>
              <div className='flex flex-col gap-y-4'>
                {featuredNews.map((post) => (
                  <div
                    key={`blog-panel-posts-${post.id}`}
                    className='flex flex-row items-center gap-x-2'
                  >
                    <Link
                      href={post.link}
                    >
                      <a>
                        <div className='relative w-24 h-16'>
                          <img
                            src={post.cover || '/img/open_graph_full.png'}
                            className='object-cover hover:opacity-80 transition-opacity duration-300 w-full h-full'
                          />
                        </div>
                      </a>
                    </Link>

                    <div className='flex justify-between flex-col py-2'>
                      <Link
                        href={post.link}
                      >
                        <a className='text-sm font-medium hover:text-primary transition-colors duration-300 truncate-3'>
                          {post.title}
                        </a>
                      </Link>

                      <p className='text-xs font-light'>
                        {/*{format(new Date(post.date_created), 'dd MMM, yyyy')}*/}
                      </p>


                      {/*<span className='text-xs font-light'>{format(new Date(post.date_created), 'dd MMM yyyy')}</span>*/}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        }
        <div className='space-y-2'>
          <span className='inline-flex justify-center px-4 py-4 w-full bg-primary text-neutral-100 font-bold'>
            Noticias Mais Recentes
          </span>
          <div className='flex flex-col gap-y-4'>
            {recentPosts.map((post) => (
              <div
                key={`blog-panel-posts-${post.id}`}
                className='flex flex-row items-center gap-x-2'
              >
                <Link
                  href={post.link}
                >
                  <a>
                    <div className='relative w-24 h-16'>
                      <img
                        src={post.cover || '/img/open_graph_full.png'}
                        className='object-cover hover:opacity-80 transition-opacity duration-300 w-full h-full'
                      />
                    </div>
                  </a>
                </Link>

                <div className='flex justify-between flex-col py-2'>
                  <Link
                    href={post.link}
                  >
                    <a className='text-sm font-medium hover:text-primary transition-colors duration-300 truncate-3'>
                      {post.title}
                    </a>
                  </Link>

                  <p className='text-xs font-light'>
                    {/*{format(new Date(post.date_created), 'dd MMM, yyyy')}*/}
                  </p>


                  {/*<span className='text-xs font-light'>{format(new Date(post.date_created), 'dd MMM yyyy')}</span>*/}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function NewsPanel({
                                    recentPosts,
                                    featuredNews,
                                    searchPosts,
                                    className = '',
                                    isNews = false
                                  }) {
  const router = useRouter();
  const [searchString, setSearchString] = useState(router.query.search || '');

  function handleSearch(value, time = 1000) {
    clearTimeout(t);
    t = setTimeout(() => {
      searchPosts({ search: value });
    }, time);
  }

  function _handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch(searchString, 0);
  }

  useEffect(() => {
    if (!!searchString) handleSearch(searchString);
  }, [searchString]);

  return (
    <aside className={classNames(className)}>
      <Popover className='relative bg-neutral-100'>
        <div className='flex justify-between items-center gap-x-4 lg:gap-0'>
          <div className='w-full'>
            <label htmlFor='blog-search' className='sr-only'>
              Search
            </label>
            <div className='relative w-full'>
              <input
                type='text'
                id='blog-search'
                onChange={(el) => {
                  setSearchString(el.currentTarget.value);
                }}
                value={searchString}
                onKeyDown={_handleKeyDown}
                className='bg-primary border-2 border-primary text-neutral-100 placeholder:text-neutral-100 focus:outline-none outline-none border-none block w-full pr-10 px-4 py-3'
                placeholder='Search'
              />
              <div className='flex absolute inset-y-0 right-0 items-center pr-5'>
                {!!searchString ? (
                  <XIcon
                    onClick={() => {
                      setSearchString('');
                      handleSearch('', 0);
                    }}
                    className='w-6 h-6 text-neutral-100 pointer-cursor'
                  />
                ) : (
                  <SearchIcon className='w-6 h-6 text-neutral-100' />
                )}
              </div>
            </div>
          </div>
          <div className='-mr-2 -my-2 lg:hidden'>
            <Popover.Button
              className='bg-neutral-100 p-2 inline-flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary'>
              <span className='sr-only'>Open menu</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter='duration-200 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute z-10 top-0 inset-x-0 transition transform origin-top-right lg:hidden'
          >
            {({ close }) => (
              <div
                className='shadow-lg ring-1 ring-black ring-opacity-5 bg-neutral-100 divide-y-2 divide-neutral-50 p-4'>
                <PanelChild
                  recentPosts={recentPosts}
                  featuredNews={featuredNews}
                  searchPosts={searchPosts}
                  close={() => {
                  }}
                  isNews={isNews}
                />
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className='hidden lg:block space-y-8'>
        <hr className='mx-8' />
        <PanelChild
          recentPosts={recentPosts}
          featuredNews={featuredNews}
          searchPosts={searchPosts}
          close={() => {
          }}
          isNews={isNews}
        />
      </div>
    </aside>
  );
}
