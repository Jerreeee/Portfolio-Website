'use client';

// import 'github-markdown-css/github-markdown.css';

import React, { ReactElement } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Link as MuiLink } from '@mui/material';
import { Box } from '@mui/material';
import CodeBlockCmp from '../Code/CodeBlockCmp';
import CodeInlineCmp from '../Code/CodeInlineCmp';
import { useTheme } from '@/Themes/ThemeProvider';

// =====================================================================
// ========================= Slot Definitions ==========================

// =====================================================================
// ============================= Component =============================

export interface MarkdownRendererCmpSettings {}

export interface MarkdownRendererCmpProps {
  markdown: string;
}

export default function MarkdownRendererCmp({ markdown }: MarkdownRendererCmpProps) {
  const { theme } = useTheme();

  return (
    <Box
      className="markdown-body"
      sx={{
        backgroundColor: 'transparent',
        color: 'inherit',
        '& pre': { background: 'rgba(0,0,0,0.06)', p: 2 },
        '& code': { background: 'rgba(0,0,0,0.06)', px: .5 },
        '& table': { borderCollapse: 'collapse', width: '100%' },
        '& th, td': { border: '1px solid #d0d7de', p: '6px 13px' },
        '& ul': { listStyle: 'disc', pl: 3 },
        '& ol': { listStyle: 'decimal', pl: 3 },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <Typography variant="h1" {...props} />,
          h2: ({node, ...props}) => <Typography variant="h2" {...props} />,
          h3: ({node, ...props}) => <Typography variant="h3" {...props} />,
          h4: ({node, ...props}) => <Typography variant="h4" {...props} />,
          h5: ({node, ...props}) => <Typography variant="h5" {...props} />,
          h6: ({node, ...props}) => <Typography variant="h6" {...props} />,
          p:  ({node, ...props}) => <Typography variant="body1" {...props} />,
          a:  ({node, ...props}) => <MuiLink {...props} target="_blank" rel="noopener noreferrer" />,
          li: ({node, ...props}) => (
            <li style={{listStyleType: 'circle'}}>
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
