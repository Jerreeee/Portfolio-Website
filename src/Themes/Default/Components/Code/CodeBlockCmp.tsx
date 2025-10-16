'use client';

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ScrollableCmp from '@/Themes/Default/Components/Scrollable/ScrollableCmp';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Size } from '@/Types/extra';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { codeBlockCmp } from './CodeBlockCmpClasses';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('CodeBlockCmp', codeBlockCmp);

const CodeRoot = makeSlot('div', 'root')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
}));

const CodeBackground = makeSlot('div', 'background')(() => ({
  display: 'inline-block',
  minWidth: '100%',
  height: 'auto',
  minHeight: '100%',
}));

// Inner: purely visual styles
const CodeStyling = makeSlot('div', 'styling')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 1.25rem',
  backgroundColor: '#1e1e1e',
  fontFamily: `'Fira Code', monospace`,
  fontSize: '0.9rem',
  lineHeight: 1.6,
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

// =====================================================================
// ============================= Component =============================

export interface CodeBlockCmpSettings {}

export interface CodeBlockCmpProps {
  children?: React.ReactNode;   // inline usage
  language?: string;            // optional explicit language
  file?: string;                // optional file path (from /public)
  size?: Size;
}

// ---------- Component ----------
export default function CodeBlockCmp(props: CodeBlockCmpProps) {
  const [content, setContent] = React.useState<string>("");

  useEffect(() => {
    if (props.file) {
      fetch(props.file)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load file: ${props.file}`);
          return res.text();
        })
        .then(setContent)
        .catch(err => {
          console.error(err);
          setContent(`/* Error loading file: ${props.file} */`);
        });
    }
  }, [props.file]);

  // detect language if not explicitly passed
  const detectedLanguage = React.useMemo(() => {
    if (props.language) return props.language;

    if (props.file) {
      const ext = props.file.split('.').pop()?.toLowerCase();
      if (ext && extensionToLanguage[ext]) {
        return extensionToLanguage[ext];
      }
    }

    return 'text'; // fallback
  }, [props.language, props.file]);

  const code = props.file ? content : String(props.children ?? "").trim();

  return (
    <CodeRoot>
      <ScrollableCmp>
        <CodeBackground>
          <CodeStyling>
            <SyntaxHighlighter
              language={detectedLanguage}
              style={oneDark}
              PreTag="div"
              customStyle={{
                  background: 'transparent',
                  margin: 0,
                  padding: 0,
                  overflow: 'visible',
                }}
                codeTagProps={{
                  style: {
                    background: 'transparent',
                    overflow: 'visible',
                    display: 'block',
                  },
                }}
            >
              {code}
            </SyntaxHighlighter>
          </CodeStyling>
        </CodeBackground>
      </ScrollableCmp>
    </CodeRoot>
  );
}
