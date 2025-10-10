'use client';

import React, { ReactElement } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Link as MuiLink } from '@mui/material';
import { Box } from '@mui/material';
import CodeBlockCmp from '../Code/CodeBlockCmp';
import CodeInlineCmp from '../Code/CodeInlineCmp';

// =====================================================================
// ========================= Slot Definitions ==========================

// =====================================================================
// ============================= Component =============================

export interface MarkdownRendererCmpSettings {}

export interface MarkdownRendererCmpProps {
  markdown: string;
}

export default function MarkdownRendererCmp({ markdown }: MarkdownRendererCmpProps) {
  return (
    <Box className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <Typography variant="h1" {...props} />,
          h2: ({node, ...props}) => <Typography variant="h2" {...props} />,
          h3: ({node, ...props}) => <Typography variant="h3" {...props} />,
          h4: ({node, ...props}) => <Typography variant="h4" {...props} />,
          h5: ({node, ...props}) => <Typography variant="h5" {...props} />,
          h6: ({node, ...props}) => <Typography variant="h6" {...props} />,
          p:  ({node, ...props}) => <Typography variant="body1" paragraph {...props} />,
          a:  ({node, ...props}) => <MuiLink {...props} target="_blank" rel="noopener noreferrer" />,
          li: ({node, ...props}) => (
            <li>
              <Typography component="span" variant="body1" {...props} />
            </li>
          ),
          pre: ({ children }) => {
            const codeElement = Array.isArray(children) ? children[0] : children;

            if (React.isValidElement<{ className?: string; children?: string }>(codeElement)) {
              const language = codeElement.props.className?.replace("language-", "") || "";

              return (
                <CodeBlockCmp language={language}>
                  {codeElement.props.children ?? ""}
                </CodeBlockCmp>
              );
            }

            // fallback if it's not valid
            return <pre>{children}</pre>;
          },
          code: ({ children }) => <CodeInlineCmp>{children}</CodeInlineCmp>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}
