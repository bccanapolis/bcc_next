import Link from 'next/link';
import Image from 'next/image';
import { apiAsset, classNames } from '@/utils';
import { useRouter } from 'next/router';

export default function BlogCard({ post, searchPosts, horizontal = false }) {
  const router = useRouter();
  const queryTag = router.query.tags;

  return (
    <article
      className={classNames('flex flex-col w-full h-full group', horizontal && 'md:flex-row')}>
      <Link href={`/blog/${post.slug}@${post.id}`}>
        <a
          className={classNames('w-full h-64 md:h-auto', horizontal && 'h-64 md:h-auto min-h-[18rem] md:w-5/12 lg:w-6/12')}>
          <div className='w-full h-full relative'>
            <Image
              className='object-cover hover:opacity-80 transition-opacity duration-300'
              src={apiAsset(post.cover.id)} alt=''
              layout='fill'
            />
          </div>
        </a>
      </Link>
      <div
        className={classNames('flex flex-col flex-1 justify-between p-4 leading-normal', horizontal && 'md:w-7/12 lg:w-6/12')}>
        <div>
          <Link href={`/blog/${post.slug}@${post.id}`}>
            <a>
              <h5 className='mb-2 text-xl font-bold tracking-tight'>{post.title}</h5>
            </a>
          </Link>
          <p className='mb-3 text-sm text-neutral-700 font-light'>{post.description}</p>
        </div>
        <div>
          <hr className='my-2' />
          <div className='flex justify-between items-center'>
            <button onClick={() => searchPosts({ author: post.user_created.id })}
                    className='inline-flex items-center space-x-2 w-auto max-w-[calc(100%/12*8)]'>
              <div className='relative w-10 h-10 inline-block rounded-full'>
                <Image
                  src={apiAsset(post.user_created.avatar.id)} className='object-cover rounded-full'
                  layout='fill' />
              </div>
              <div className='inline-block text-left'>
                <p
                  className='text-sm truncate overflow-hidden'>{`${post.user_created.first_name} ${post.user_created.last_name}`}</p>
                <p className='text-xs font-light'>{post.user_created.title}</p>
              </div>
            </button>

            <ul className='inline-flex justify-end gap-x-1 items-baseline w-max max-w-[calc(100%/12*6)] flex-wrap'>
              {
                !!post.tags &&
                post.tags.map(({ blog_tag_id: item }) => (
                  <li key={`tag-post-${post.slug}-${item.name}`}>
                    <button onClick={() => searchPosts({ tags: item.name })}
                            className={classNames('text-xs border-[1px] border-neutral-100 bg-white px-1 py-0.5 hover:text-white hover:bg-primary/80 transition-colors duration-300', queryTag === item.name ? 'bg-primary/80 text-white' : 'text-neutral-500 ')}>{item.name}</button>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}