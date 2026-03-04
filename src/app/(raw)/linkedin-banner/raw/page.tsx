'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAppTheme } from '@/Themes/ThemeProvider';

// Strip background from oneDark so the code area is truly transparent
const transparentOneDark = Object.fromEntries(
  Object.entries(oneDark).map(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const { background, backgroundColor, ...rest } = value as Record<string, unknown>;
      return [key, rest];
    }
    return [key, value];
  }),
);
import type { ThemeName, VariationName } from '@/Themes';

const CODE_SNIPPET = `void Developer::StartDay()
{
  coffee.Refill();  // critical system dependency

  // TODO: figure out why this works
  bugs.Fix(bugs.Count() - 1);

  // FIXME: works on my machine
  features.Ship();

  // NOTE: do NOT remove this line
  //       nobody knows what it does
  //       but everything breaks without it
  magic.DoTheThing();

  if (deadline.IsClose())
    coffee.Refill(); // emergency protocol
}`;

const TECH_ICONS = [
  { name: 'ClaudeCode', src: '/Icons/ClaudeCode.svg' },
  { name: 'C++', src: '/Icons/cplusplus.svg' },
  { name: 'Python', src: '/Icons/Python.svg' },
  { name: 'React', src: '/Icons/React.svg' },
];

export default function LinkedInBannerPage() {
  const searchParams = useSearchParams();
  const { setTheme, theme } = useAppTheme();

  // Apply theme from query param on mount
  useEffect(() => {
    const variation = searchParams.get('theme');
    if (variation && ['Dark', 'Light', 'Jade'].includes(variation)) {
      setTheme({
        name: 'Default' as ThemeName,
        variation: variation as VariationName<'Default'>,
      });
    }
  }, [searchParams, setTheme]);

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const bgColor = `color-mix(in srgb, ${theme.palette.background.default} 92%, ${primary})`;

  return (
    <Box
      id="linkedin-banner"
      data-ready
      sx={{
        width: 1584,
        height: 396,
        display: 'flex',
        alignItems: 'center',
        background: bgColor,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: '"Inter", "Roboto", sans-serif',
        filter: 'contrast(1.3) saturate(1.6) brightness(1.1)',
      }}
    >
      {/* #OPENTOWORK badge */}
      <Box
        component="span"
        sx={{
          position: 'absolute',
          top: 16,
          left: 24,
          zIndex: 2,
          fontSize: '22px',
          fontWeight: 800,
          letterSpacing: '0.06em',
          background: `linear-gradient(135deg, ${primary}, ${secondary})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
        }}
      >
        #OPENTOWORK
      </Box>

      {/* Right edge gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '30%',
          height: '100%',
          background: `linear-gradient(to right, transparent 0%, ${primary}50 75%, ${primary}80 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Circuit board background */}
      <Box
        component="svg"
        viewBox="0 0 1584 396"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Mask to dim circuit behind the code snippet */}
        <defs>
          <filter id="circuit-mask-blur">
            <feGaussianBlur stdDeviation={40} />
          </filter>
          <mask id="circuit-dim">
            <rect width="1584" height="396" fill="white" />
            <g filter="url(#circuit-mask-blur)">
              <polygon
                points="240,90 900,30 860,396 120,396"
                fill="black"
                opacity={0.85}
              />
            </g>
          </mask>
        </defs>

        <g mask="url(#circuit-dim)" style={{ filter: 'brightness(10)' }}>
        {/* === CIRCUIT TRACES === */}

        {/* Trace A: enters from left edge, runs right */}
        <line x1={-20} y1={55} x2={180} y2={55} stroke={secondary} strokeWidth={2} opacity={0.28} />
        <line x1={180} y1={55} x2={180} y2={165} stroke={secondary} strokeWidth={2} opacity={0.28} />
        <line x1={180} y1={165} x2={420} y2={165} stroke={secondary} strokeWidth={2} opacity={0.30} />

        {/* Trace B: left vertical bus up to top edge */}
        <line x1={130} y1={260} x2={130} y2={140} stroke={primary} strokeWidth={2} opacity={0.28} />
        <line x1={130} y1={140} x2={350} y2={140} stroke={primary} strokeWidth={2} opacity={0.30} />
        <line x1={350} y1={140} x2={350} y2={55} stroke={primary} strokeWidth={2} opacity={0.26} />
        <line x1={350} y1={55} x2={540} y2={55} stroke={primary} strokeWidth={2} opacity={0.28} />
        <line x1={540} y1={55} x2={540} y2={-10} stroke={primary} strokeWidth={1.5} opacity={0.24} />

        {/* Trace C: diagonal from A, runs right */}
        <line x1={420} y1={165} x2={500} y2={100} stroke={primary} strokeWidth={2} opacity={0.28} />
        <line x1={500} y1={100} x2={680} y2={100} stroke={primary} strokeWidth={2} opacity={0.30} />

        {/* Trace D: enters from left at bottom, diagonal turn, runs right */}
        <line x1={-10} y1={310} x2={280} y2={310} stroke={secondary} strokeWidth={2} opacity={0.30} />
        <line x1={280} y1={310} x2={340} y2={250} stroke={secondary} strokeWidth={2} opacity={0.26} />
        <line x1={340} y1={250} x2={560} y2={250} stroke={secondary} strokeWidth={2} opacity={0.28} />

        {/* Trace E: continues from D diagonal, then right */}
        <line x1={560} y1={250} x2={640} y2={330} stroke={secondary} strokeWidth={2} opacity={0.26} />
        <line x1={640} y1={330} x2={820} y2={330} stroke={secondary} strokeWidth={2} opacity={0.28} />

        {/* Trace F: branch from D going off bottom edge */}
        <line x1={80} y1={310} x2={80} y2={410} stroke={secondary} strokeWidth={1.5} opacity={0.24} />

        {/* Trace G: short vertical connector */}
        <line x1={250} y1={85} x2={250} y2={165} stroke={primary} strokeWidth={1.5} opacity={0.24} />

        {/* Trace H: vertical connector center-left */}
        <line x1={420} y1={195} x2={420} y2={310} stroke={secondary} strokeWidth={1.5} opacity={0.24} />

        {/* Trace I: center horizontal + down */}
        <line x1={680} y1={180} x2={780} y2={180} stroke={primary} strokeWidth={2} opacity={0.26} />
        <line x1={780} y1={180} x2={780} y2={280} stroke={primary} strokeWidth={1.5} opacity={0.24} />

        {/* Trace J: right region main trace */}
        <line x1={950} y1={80} x2={1150} y2={80} stroke={primary} strokeWidth={1.5} opacity={0.22} />
        <line x1={1150} y1={80} x2={1150} y2={200} stroke={primary} strokeWidth={1.5} opacity={0.22} />
        <line x1={1150} y1={200} x2={1350} y2={200} stroke={primary} strokeWidth={1.5} opacity={0.20} />
        <line x1={1350} y1={200} x2={1350} y2={310} stroke={primary} strokeWidth={1.5} opacity={0.18} />
        <line x1={1350} y1={310} x2={1600} y2={310} stroke={secondary} strokeWidth={1.5} opacity={0.18} />

        {/* Trace K: right secondary traces */}
        <line x1={1000} y1={300} x2={1150} y2={300} stroke={secondary} strokeWidth={1.5} opacity={0.18} />
        <line x1={1400} y1={-10} x2={1400} y2={200} stroke={secondary} strokeWidth={1.5} opacity={0.18} />
        <line x1={1400} y1={50} x2={1600} y2={50} stroke={primary} strokeWidth={1.5} opacity={0.18} />

        {/* === NODES (intersection circles) === */}

        {/* Left side nodes */}
        <circle cx={180} cy={55} r={5} fill={secondary} opacity={0.45} />
        <circle cx={180} cy={165} r={5} fill={primary} opacity={0.40} />
        <circle cx={420} cy={165} r={5} fill={primary} opacity={0.40} />
        <circle cx={500} cy={100} r={5} fill={secondary} opacity={0.45} />
        <circle cx={680} cy={100} r={5} fill={primary} opacity={0.38} />
        <circle cx={130} cy={260} r={5} fill={primary} opacity={0.40} />
        <circle cx={130} cy={140} r={5} fill={primary} opacity={0.38} />
        <circle cx={350} cy={140} r={6} fill={secondary} opacity={0.45} />
        <circle cx={350} cy={55} r={5} fill={primary} opacity={0.38} />
        <circle cx={540} cy={55} r={6} fill={primary} opacity={0.45} />
        <circle cx={80} cy={310} r={5} fill={secondary} opacity={0.40} />
        <circle cx={280} cy={310} r={5} fill={primary} opacity={0.40} />
        <circle cx={340} cy={250} r={5} fill={secondary} opacity={0.40} />
        <circle cx={560} cy={250} r={6} fill={secondary} opacity={0.45} />
        <circle cx={640} cy={330} r={5} fill={secondary} opacity={0.38} />
        <circle cx={820} cy={330} r={5} fill={primary} opacity={0.40} />
        <circle cx={250} cy={85} r={4} fill={primary} opacity={0.36} />
        <circle cx={250} cy={165} r={4} fill={primary} opacity={0.34} />
        <circle cx={420} cy={195} r={5} fill={secondary} opacity={0.38} />
        <circle cx={420} cy={310} r={5} fill={secondary} opacity={0.34} />
        <circle cx={680} cy={180} r={5} fill={primary} opacity={0.38} />
        <circle cx={780} cy={180} r={5} fill={primary} opacity={0.40} />
        <circle cx={780} cy={280} r={5} fill={secondary} opacity={0.38} />

        {/* Right side nodes (slightly subtler) */}
        <circle cx={950} cy={80} r={4} fill={primary} opacity={0.32} />
        <circle cx={1150} cy={80} r={5} fill={secondary} opacity={0.35} />
        <circle cx={1150} cy={200} r={4} fill={primary} opacity={0.32} />
        <circle cx={1350} cy={200} r={4} fill={primary} opacity={0.28} />
        <circle cx={1350} cy={310} r={4} fill={secondary} opacity={0.26} />
        <circle cx={1000} cy={300} r={4} fill={secondary} opacity={0.26} />
        <circle cx={1150} cy={300} r={4} fill={secondary} opacity={0.26} />
        <circle cx={1400} cy={50} r={4} fill={secondary} opacity={0.26} />
        <circle cx={1400} cy={200} r={4} fill={primary} opacity={0.26} />

        {/* === GEOMETRIC ACCENTS ("components" on the board) === */}

        {/* Hexagon at node (350, 140) */}
        <polygon
          points="335,140 342,128 358,128 365,140 358,152 342,152"
          fill="none"
          stroke={secondary}
          strokeWidth={2}
          opacity={0.30}
        />

        {/* Small triangle at node (540, 55) */}
        <polygon points="530,45 550,45 540,30" fill={primary} opacity={0.30} />

        {/* Diamond at node (780, 280) */}
        <polygon
          points="780,268 792,280 780,292 768,280"
          fill={primary}
          opacity={0.28}
        />

        {/* Hexagon at right node (1150, 80) */}
        <polygon
          points="1140,80 1145,72 1155,72 1160,80 1155,88 1145,88"
          fill="none"
          stroke={primary}
          strokeWidth={1.5}
          opacity={0.22}
        />

        {/* Triangle at node (640, 330) */}
        <polygon
          points="630,325 650,325 640,340"
          fill={secondary}
          opacity={0.26}
        />
        </g>
      </Box>

      {/* Left side — 3D code snippet */}
      <Box
        sx={{
          flex: '0 0 55%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pl: 'calc(64px + 120px)',
          pt: 4,
          perspective: '1200px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 750,
            transform: 'rotateY(-30deg) rotateX(30deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Invisible opaque layer for glow calculation */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: primary,
              borderRadius: `${theme.shape.borderRadius}px`,
              filter: 'url(#code-snippet-glow) url(#code-snippet-gradient)',
            }}
          />
          {/* Visible code snippet with transparent bg */}
          <Box
            sx={{
              position: 'relative',
              border: '2px solid transparent',
              borderImage: `linear-gradient(135deg, ${primary}, ${secondary}) 1`,
              borderRadius: `${theme.shape.borderRadius}px`,
              overflow: 'hidden',
              background: `${primary}33`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 60px ${primary}22`,
              opacity: 0.6,
            }}
          >
            <SyntaxHighlighter
              language="cpp"
              style={transparentOneDark}
              wrapLines
              lineProps={{ style: { filter: 'saturate(1.8) brightness(1.8)' } }}
              codeTagProps={{
                style: { background: 'transparent' },
              }}
              customStyle={{
                margin: 0,
                padding: '16px 20px',
                width: '100%',
                fontSize: '24px',
                lineHeight: '1.5',
                background: 'transparent !important' as 'transparent',
                backgroundColor: 'transparent',
                height: 500,
                overflow: 'hidden',
              }}
              showLineNumbers
              lineNumberStyle={{
                color: 'rgba(255,255,255,0.25)',
                fontSize: '13px',
                minWidth: '2em',
                paddingRight: '12px',
              }}
            >
              {CODE_SNIPPET}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </Box>

      {/* Right side — Name, title, tech icons */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          pl: 4,
          pr: 6,
          pb: 5,
          gap: 1,
          zIndex: 1,
          filter: 'drop-shadow(0 0 0px rgba(0,0,0,1)) brightness(1.3)',
        }}
      >
        {/* Name */}
        <Box
          component="h1"
          sx={{
            m: 0,
            fontSize: '56px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
          }}
        >
          Jeroen Denayer
        </Box>

        {/* Title */}
        <Box
          component="p"
          sx={{
            m: 0,
            fontSize: '26px',
            fontWeight: 300,
            color: theme.palette.text.secondary,
            letterSpacing: '0.04em',
          }}
        >
          Software Developer
        </Box>

        {/* Divider line with gradient */}
        <Box
          sx={{
            width: 260,
            height: 2,
            background: secondary,
            borderRadius: 1,
            my: 0,
          }}
        />

        {/* Tech icons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            mt: 1,
          }}
        >
          {TECH_ICONS.map((icon) => (
            <Box
              key={icon.name}
              component="img"
              src={icon.src}
              alt={icon.name}
              sx={{
                height: 36,
                width: 'auto',
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(0.9) saturate(0.9)'
                    : 'none',
                opacity: 0.85,
              }}
            />
          ))}
          <Box
            component="span"
            sx={{
              fontSize: '28px',
              fontWeight: 600,
              color: theme.palette.text.secondary,
              letterSpacing: '0.1em',
              height: 36,
              lineHeight: '36px',
            }}
          >
            ···
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
