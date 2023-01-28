import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';
import remarkHighlight from 'remark-highlight.js';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default function Markdown({ children, className }) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm, remarkEmoji, remarkHighlight]}
      rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
    >
      {children}
    </ReactMarkdown>
  );
}
