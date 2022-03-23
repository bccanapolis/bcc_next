import { classNames } from '@/utils';
import ArticleCardHome from '@/components/article/ArticleCardHome';

export default function RecentPostsSection({ section, posts = [], className }) {
  return (
    <div className='container'>
      <div className='space-y-2 mb-16'>
        <h5 className='text-4xl font-bold text-center'>{section.title || 'Section Title'}</h5>
        <p className='font-light text-center'>{section.subtitle || 'Section subtitle.'}</p>
      </div>

      <div className={classNames('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8', className)}>
        {
          !!posts.length &&
          posts.map(post => (
            <ArticleCardHome key={`recent-post-${post.id}`} post={post} />
          ))
        }
      </div>
    </div>
  );
}