import Link from 'next/link';
import { classNames } from '@/utils';
import { useRouter } from 'next/router';
import { CalendarIcon } from '@heroicons/react/outline';
import { format, parseISO } from 'date-fns';

export default function NewsCard({ post, searchPosts }) {
  const router = useRouter();

  return (
    <article className={classNames('flex flex-col w-full h-full group ')}>

      <Link href={post.link}>
        <a
          className={classNames(
            'w-full h-64 min-h-[18rem]'
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
      <time
        className='flex lg:text-right text-sm font-light lg:justify-end flex-row-reverse lg:flex-row items-center gap-x-2 mt-auto'>
        {format(parseISO(post.published_at), 'dd MMM, yyyy')}
        <CalendarIcon className='w-4 h-4 inline' />
      </time>
    </article>
  )
    ;
}
