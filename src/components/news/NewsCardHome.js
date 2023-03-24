import Link from 'next/link';
import { classNames } from '@/utils';
import { format, parseISO } from 'date-fns';

export default function NewsCardHome({ post, className }) {
  return (
    <article
      className={classNames('flex flex-col w-full h-full group', className)}
    >
      <Link href={post.link} className={classNames('w-full h-48')}>
        <div className="w-full h-full relative">
          <img
            className="object-cover hover:opacity-80 transition-opacity duration-300 w-full h-full"
            src={post.cover ?? '/img/open_graph_full.png'}
            alt=""
          />
        </div>
      </Link>
      <div className="p-2 mt-2 space-y-2">
        <div className="divide flex justify-between">
          <p className="text-sm">
            {format(parseISO(post.published_at), 'dd MMM, yyyy')}
          </p>
        </div>
        <div>
          <Link href={post.link}>
            <h5 className="font-bold tracking-tight hover:text-primary transition-colors duration-300">
              {post.title}
            </h5>
          </Link>
          <hr className="my-2" />
          <div
            className="text-sm text-neutral-700 font-light truncate-4"
            dangerouslySetInnerHTML={{ __html: post.description.trim() }}
          ></div>
        </div>
      </div>
    </article>
  );
}
