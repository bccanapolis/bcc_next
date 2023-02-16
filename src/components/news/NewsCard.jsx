import Link from 'next/link';
import Image from 'next/image';
import { classNames } from '@/utils';
import { useRouter } from 'next/router';
import { CalendarIcon } from '@heroicons/react/outline';
import { format, parse, parseISO } from 'date-fns';

export default function NewsCard({ post, searchPosts }) {
  const router = useRouter();

  return (
    <article className={classNames('flex flex-col w-full h-full group ')}>
      <div className='flex flex-col lg:flex-row '>
        <div className='flex flex-col-reverse lg:w-3/12 justify-between items-start lg:items-end py-4 lg:p-4 gap-2'>
          <div className='flex lg:flex-col justify-between w-full'>
            {/*<p className="flex lg:text-right text-sm font-light justify-end  flex-row-reverse lg:flex-row items-center gap-x-2">*/}
            {/*  {`${post.user_created.first_name} ${post.user_created.last_name}`}*/}
            {/*  <UserIcon className="w-4 h-4 inline" />*/}
            {/*</p>*/}
            <p
              className='flex lg:text-right text-sm font-light lg:justify-end flex-row-reverse lg:flex-row items-center gap-x-2'>
              {format(parseISO(post.published_at), 'dd MMM, yyyy')}
              <CalendarIcon className='w-4 h-4 inline' />
            </p>
          </div>


        </div>
        <Link href={post.link}>
          <a
            className={classNames(
              'w-full h-64 lg:h-auto min-h-[18rem] lg:w-9/12'
            )}
          >
            <div className='w-full h-full relative'>
              <img
                className='object-cover hover:opacity-80 transition-opacity duration-300 w-full h-full'
                src={post.cover ?? '/img/open_graph_full.png'}
                alt=''
              />
            </div>
          </a>
        </Link>
      </div>
      <div className='flex justify-end'>
        <div
          className={classNames(
            'flex flex-col justify-between p-4 leading-normal w-full lg:w-9/12'
          )}
        >
          <div>
            <Link
              href={post.link}
            >
              <a>
                <h5 className='mb-2 text-xl font-bold tracking-tight hover:text-primary transition-colors duration-300'>
                  {post.title}
                </h5>
              </a>
            </Link>
            <p className='mb-3 text-sm text-neutral-700 font-light truncate-4'>
              {post.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
