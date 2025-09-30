'use client';

import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Typography, Link as MuiLink } from '@mui/material';
import { Box } from '@mui/material';

export interface MarkdownRendererProps {
  markdown: string;
}

export default function MarkdownRendererCmp({ markdown }: MarkdownRendererProps) {
  return (
    <Box className="markdown-body">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({node, ...props}) => <Typography variant="h1" {...props} />,
                h2: ({node, ...props}) => <Typography variant="h2" {...props} />,
                h3: ({node, ...props}) => <Typography variant="h3" {...props} />,
                h4: ({node, ...props}) => <Typography variant="h4" {...props} />,
                h5: ({node, ...props}) => <Typography variant="h5" {...props} />,
                h6: ({node, ...props}) => <Typography variant="h6" {...props} />,
                p:  ({node, ...props}) => <Typography variant="body1" paragraph {...props} />,
                a:  ({node, ...props}) => <MuiLink {...props} target="_blank" rel="noopener noreferrer" />,
                li: ({node, ...props}) => <li><Typography component="span" variant="body1" {...props} /></li>,
                // code: (props) => {
                //     const { inline, className, children, ...rest } = props as
                //         React.ComponentPropsWithoutRef<'code'> & { inline?: boolean };
                    
                //     if (inline) {
                //         return (
                //             <Typography component="code" variant="body2" {...rest}>
                //                 {children}
                //             </Typography>
                //         )
                //     }

                //     return (
                //         <Box
                //         component="pre"
                //         sx={{
                //             p: 2,
                //             bgcolor: 'grey.900',
                //             color: 'grey.100',
                //             borderRadius: 1,
                //             overflowX: 'auto',
                //             fontFamily: 'monospace',
                //         }}
                //         {...rest}
                //         >
                //         <code>{children}</code>
                //         </Box>
                //     );
                // },
            } satisfies Components}
        >
        {markdown}
        </ReactMarkdown>
    </Box>
  );
}
