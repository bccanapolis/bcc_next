import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';
import remarkHighlight from 'remark-highlight.js';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function Markdown({ children, className }) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm, remarkEmoji, remarkHighlight, remarkMath]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypeKatex,
          {
            css: 'https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css',
          },
        ],
      ]}
    >
      {children}
    </ReactMarkdown>
  );
}
