import { classNames } from '@/utils';
import BlogCardHome from '@/components/blog/BlogCardHome';

export default function RecentPostsSection({ posts = [], className }) {
  return (
    <div className='container'>
      <div className='space-y-2 mb-16'>
        <h5 className='text-4xl font-bold text-center'>Latest posts from our blog</h5>
        <p className='font-light text-center'>In the history of modern astronomy there is.</p>
      </div>

      <div className={classNames('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8', className)}>
        {
          !!posts.length &&
          posts.map(post => (
            <BlogCardHome key={`recent-post-${post.id}`} post={post} />
          ))
        }
      </div>
    </div>
  );
}