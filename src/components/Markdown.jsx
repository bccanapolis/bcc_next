import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Markdown({ children, className }) {
  return (
    <ReactMarkdown className={className}
                   components={{
                     code({ node, inline, className, children, ...props }) {
                       const match = /language-(\w+)/.exec(className || '');
                       return !inline && match ? (
                         <SyntaxHighlighter
                           style={monokai}
                           showLineNumbers={true}
                           language={match[1]}
                           PreTag='div'
                           {...props}
                         >
                           {String(children).replace(/\n$/, '')}
                         </SyntaxHighlighter>
                       ) : (
                         <code className={className} {...props}>
                           {children}
                         </code>
                       );
                     }
                   }}
                   remarkPlugins={[remarkGfm, remarkEmoji]} rehypePlugins={[rehypeRaw]}>
      {children}
    </ReactMarkdown>
  );
}