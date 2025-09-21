'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface MarkdownProps {
  content: string;
  className?: string;
}

// export function MarkdownCmp(props: MarkdownProps) {
//   return (
//     <ReactMarkdown
//       className={props.className}
//       remarkPlugins={[remarkGfm]} // supports tables, strikethrough, etc.
//     >
//       {props.content}
//     </ReactMarkdown>
//   );
// }
