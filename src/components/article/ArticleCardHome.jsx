import Link from 'next/link';
import Image from 'next/image';
import { apiAsset, classNames } from '@/utils';
import { format } from 'date-fns';
import slugify from 'slugify';
import { ptBR } from 'date-fns/locale';

export default function ArticleCardHome({ post, isNews }) {
  const route = isNews ? '/noticias' : '/blog';

  return (
    <article className={classNames('flex flex-col w-full h-full group ')}>
      <Link
        href={`${route}/${post.slug || slugify(post.title.toLowerCase())}.${
          post.id
        }`}
        className={classNames('w-full h-48')}
      >
        <div className="w-full h-full relative">
          <Image
            className="object-cover hover:opacity-80 transition-opacity duration-300"
            src={apiAsset(post.cover.id)}
            alt=""
            layout="fill"
          />
        </div>
      </Link>
      <div className="p-2 mt-2 space-y-2">
        <div className="divide flex justify-between">
          {!isNews && (
            <p className="text-sm">{`${post.user_created.first_name} ${post.user_created.last_name}`}</p>
          )}
          <p className="text-sm">
            {format(new Date(post.date_created), 'dd MMM, yyyy', {
              locale: ptBR,
            })}
          </p>
        </div>
        <div>
          <Link
            href={`${route}/${post.slug || slugify(post.title.toLowerCase())}.${
              post.id
            }`}
          >
            <h5 className="font-bold tracking-tight hover:text-primary transition-colors duration-300">
              {post.title}
            </h5>
          </Link>
          <hr className="my-2" />
          <p className="text-sm text-neutral-700 font-light truncate-4">
            {post.description}
          </p>
        </div>
      </div>
    </article>
  );
}
