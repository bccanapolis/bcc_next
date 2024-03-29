import Link from 'next/link';
import Image from 'next/image';
import { apiAsset, classNames } from '@/utils';
import { useRouter } from 'next/router';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import slugify from 'slugify';
import { ptBR } from 'date-fns/locale';

export default function ArticleCard({ post, searchPosts }) {
  const router = useRouter();
  const queryTag = router.query.tags;

  return (
    <article className={classNames('flex flex-col w-full h-full group ')}>
      <div className="flex flex-col lg:flex-row ">
        <div className="flex flex-col-reverse lg:w-3/12 justify-between items-start lg:items-end py-4 lg:p-4 gap-2">
          <div className="flex lg:flex-col justify-between w-full">
            <p className="flex lg:text-right text-sm font-light justify-end  flex-row-reverse lg:flex-row items-center gap-x-2">
              {`${post.user_created.first_name} ${post.user_created.last_name}`}
              <UserIcon className="w-4 h-4 inline" />
            </p>
            <p className="flex lg:text-right text-sm font-light lg:justify-end flex-row-reverse lg:flex-row items-center gap-x-2">
              {format(new Date(post.date_created), 'dd MMM, yyyy', {
                locale: ptBR,
              })}
              <CalendarIcon className="w-4 h-4 inline" />
            </p>
          </div>

          <ul className="flex flex-row lg:flex-col lg:justify-end w-full items-end gap-x-1 flex-wrap">
            {!!post.tags &&
              post.tags.map(({ article_tags_id: item }) => (
                <li key={`tag-post-${post.slug}-${item.name}`}>
                  <button
                    onClick={() => searchPosts({ tags: item.name })}
                    className={classNames(
                      'text-xs bg-neutral-100 px-1 py-0.5 hover:text-neutral-100 hover:bg-primary/80 transition-colors duration-300',
                      queryTag === item.name
                        ? 'bg-primary/80 text-neutral-100'
                        : 'text-neutral-700 '
                    )}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <Link
          href={`/blog/${slugify(post.title.toLowerCase())}.${post.id}`}
          className={classNames(
            'w-full h-64 lg:h-auto min-h-[18rem] lg:w-9/12'
          )}
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
      </div>
      <div className="flex justify-end">
        <div
          className={classNames(
            'flex flex-col justify-between p-4 leading-normal w-full lg:w-9/12'
          )}
        >
          <div>
            <Link
              href={`/blog/${slugify(post.title.toLowerCase())}.${post.id}`}
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight hover:text-primary transition-colors duration-300">
                {post.title}
              </h5>
            </Link>
            <p className="mb-3 text-sm text-neutral-700 font-light truncate-4">
              {post.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
