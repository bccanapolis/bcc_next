import { classNames } from '@/utils';
import Link from 'next/link';
import ArticleCardHome from '@/components/article/ArticleCardHome';
import { ArrowRightIcon } from '@heroicons/react/outline';

export default function RecentPostsSection({ section, posts = [], className }) {
  return (
    <div className={classNames('container', className)}>
      <div className="space-y-2 mb-12">
        <h5 className="text-4xl font-bold text-center">
          {section.title || 'Section Title'}
        </h5>
        <p className="font-light text-center">
          {section.subtitle || 'Section subtitle.'}
        </p>
      </div>
      <Link href="/blog">
        <a className="text-sm hover:text-primary float-right mb-8">
          Veja mais <ArrowRightIcon className="w-4 h-4 inline-block" />
        </a>
      </Link>
      <div
        className={classNames(
          'clear-both grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8',
          className
        )}
      >
        {!!posts.length &&
          posts.map((post) => (
            <ArticleCardHome key={`recent-post-${post.id}`} post={post} />
          ))}
      </div>
    </div>
  );
}
