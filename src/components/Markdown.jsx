import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';
import remarkHighlight from 'remark-highlight.js';

export default function Markdown({ children, className }) {
  return (
    <ReactMarkdown className={className}
                   remarkPlugins={[remarkGfm, remarkEmoji, remarkHighlight]} rehypePlugins={[rehypeRaw]}>
      {children}
    </ReactMarkdown>
  );
}