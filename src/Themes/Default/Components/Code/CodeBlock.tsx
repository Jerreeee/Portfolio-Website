'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import ScrollableCmp from '@/Themes/Default/Components/Scrollable/Scrollable';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ---------- Styles ----------
const CodeWrapper = styled('div', {
  name: 'CodeBlock',
  slot: 'Root',
})(({ theme }) => ({
  padding: '1rem 1.25rem',
  backgroundColor: '#1e1e1e',
  borderRadius: theme.shape.borderRadius,
  fontFamily: `'Fira Code', monospace`,
  fontSize: '0.9rem',
  lineHeight: 1.6,
  margin: '1rem 0',
  border: '1px solid #2d2d2d',
}));

// ---------- File extension → Prism language map ----------
const extensionToLanguage: Record<string, string> = {
  js: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  json: 'json',
  html: 'html',
  css: 'css',
  scss: 'scss',
  cpp: 'cpp',
  c: 'c',
  h: 'c',
  hpp: 'cpp',
  java: 'java',
  py: 'python',
  rb: 'ruby',
  go: 'go',
  rs: 'rust',
  php: 'php',
  md: 'markdown',
  sh: 'bash',
  yaml: 'yaml',
  yml: 'yaml',
};

// ---------- Props ----------
export interface CodeBlockProps {
  children?: React.ReactNode;   // inline usage
  language?: string;            // optional explicit language
  file?: string;                // optional file path (from /public)
}

// ---------- Component ----------
export default function CodeBlock({ children, language, file }: CodeBlockProps) {
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    if (file) {
      fetch(file)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load file: ${file}`);
          return res.text();
        })
        .then(setContent)
        .catch(err => {
          console.error(err);
          setContent(`/* Error loading file: ${file} */`);
        });
    }
  }, [file]);

  // detect language if not explicitly passed
  const detectedLanguage = React.useMemo(() => {
    if (language) return language;

    if (file) {
      const ext = file.split('.').pop()?.toLowerCase();
      if (ext && extensionToLanguage[ext]) {
        return extensionToLanguage[ext];
      }
    }

    return 'text'; // fallback
  }, [language, file]);

  const code = file ? content : String(children ?? "").trim();

  return (
    <ScrollableCmp>
      <CodeWrapper>
        <SyntaxHighlighter
          language={detectedLanguage}
          style={oneDark}
          PreTag="div"
          customStyle={{
            background: 'transparent',
            margin: 0,
            padding: 0,
          }}
          codeTagProps={{
            style: { background: 'transparent' },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </CodeWrapper>
    </ScrollableCmp>
  );
}
