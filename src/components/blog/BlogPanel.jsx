import { apiAsset, classNames } from '@/utils';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

let t = null;

export default function BlogPanel({ recentPosts, pageAuthors, tags, searchPosts, className = '' }) {
  const router = useRouter();
  const queryTag = router.query.tags;
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
    if (!!searchString)
      handleSearch(searchString);
  }, [searchString]);

  return (
    <aside className={classNames('flex flex-col gap-y-8', className)}>
      <div>
        <label htmlFor='blog-search' className='sr-only'>Search</label>
        <div className='relative'>
          <input type='text' id='blog-search'
                 onChange={(el) => {
                   setSearchString(el.currentTarget.value);
                 }}
                 value={searchString}
                 onKeyDown={_handleKeyDown}
                 className='bg-primary border-2 border-primary text-white placeholder:text-white rounded-full focus:outline-none outline-none border-none block w-full pr-10 px-4 py-3'
                 placeholder='Search' />
          <div className='flex absolute inset-y-0 right-0 items-center pr-5'>
            {
              !!searchString ?
                <XIcon onClick={() => {
                  setSearchString('');
                  handleSearch('', 0);
                }} className='w-6 h-6 text-white pointer-cursor' />
                :
                <SearchIcon className='w-6 h-6 text-white' />
            }
          </div>
        </div>
      </div>
      {
        !!pageAuthors.length &&
        <>
          <hr className='mx-8' />
          <div id='swiper-blog-panel'>
            <Swiper
              slidesPerView={1}
              autoplay={{
                delay: 5000
              }}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}>
              {
                pageAuthors.map(item => (
                  <SwiperSlide key={`blog-panel-author-${item.id}`}
                               className='flex flex-col items-center justify-center'>
                    <div className='relative w-48 h-48 inline-block rounded-full mb-4'>
                      <Image
                        src={apiAsset(item.avatar.id)} className='object-cover rounded-full'
                        layout='fill' />
                    </div>
                    <div className='inline-block text-center'>
                      <p className='font-medium'>{`${item.first_name} ${item.last_name}`}</p>
                      <p className='text-sm font-light'>{item.title}</p>
                      <p className='font-light text-sm mt-4'>
                        {item.description}
                      </p>
                    </div>
                  </SwiperSlide>
                ))
              }

            </Swiper>
          </div>
        </>

      }


      <hr className='mx-8' />
      <div className='space-y-4'>
        <span
          className='inline-flex justify-center px-4 py-4 w-full bg-primary text-white font-bold'>Posts Recentes</span>
        <div className='flex flex-col gap-y-4'>
          {
            recentPosts.map((post) => (
              <div key={`blog-panel-posts-${post.id}`} className='flex flex-row items-center gap-x-2'>
                <Link href={`/blog/${post.slug}@${post.id}`}>
                  <a>
                    <div className='relative w-24 h-16'>
                      <Image
                        src={apiAsset(post.cover.id)}
                        className='object-cover hover:opacity-80 transition-opacity duration-300'
                        layout='fill' />
                    </div>
                  </a>
                </Link>

                <div className='flex justify-between flex-col py-2'>
                  <Link href={`/blog/${post.slug}@${post.id}`}>
                    <a>
                      <h5 className='text-sm font-medium'>{post.title}</h5>
                    </a>
                  </Link>
                  <p
                    className='text-xs font-light'>{`${post.user_created.first_name} ${post.user_created.last_name}`}</p>
                  {/*<span className='text-xs font-light'>{format(new Date(post.date_created), 'dd MMM yyyy')}</span>*/}
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <hr className='mx-8' />
      <div className='space-y-4'>
        <span
          className='inline-flex justify-center px-4 py-4 w-full bg-primary text-white font-bold'>Nuvem de Tags</span>
        <ul className='inline-flex gap-x-4 gap-y-2 items-baseline flex-wrap'>
          {
            tags.map((item) => (
              <li key={`blog-panel-tag-${item}`}>
                <button onClick={() => searchPosts({ tags: item })}
                        className={classNames('text-xs border-[1px] border-neutral-100 bg-white px-2 py-1 hover:text-white hover:bg-primary/80 transition-colors duration-300', queryTag === item ? 'bg-primary/80 text-white' : 'text-neutral-500 ')}>{item}</button>
              </li>
            ))
          }
        </ul>
      </div>
    </aside>
  );
}