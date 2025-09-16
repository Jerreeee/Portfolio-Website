'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useTheme } from '@/Themes/ThemeProvider';
import { anims } from '@/Themes/Default/animations';
import { mergeVariants, mergeAnims } from '@/Utils/MergeObjects';
import { constructCSSVarsFromTheme } from '@/Utils/ConstructCSSVarsFromTheme';
import { IconCmp } from '@/Themes/Default/Components/Icon';
import { ProjectInfo } from '@/data/projects/project'

export type ProjectCardTheme = {
  bgColor: string;
  bgHoverColor: string;
  borderRadius: number;
  shadowColor: string;

  titleTextColor: string;
  descriptionTextColor: string;
};

export function ProjectCardCmp({ project }: { project: ProjectInfo }) {
  const { theme: activeTheme } = useTheme();
  const theme = activeTheme.components.projectCard.theme;

  const H1 = activeTheme.components.h1.cmp;
  const P = activeTheme.components.p.cmp;

  return (
    <motion.div className="
      overflow-hidden
      flex flex-col space-y-3
      rounded-lg
      shadow hover:shadow-2xl
      bg-[var(--bgColor)] hover:bg-[var(--bgHoverColor)]
      transition-colors"
      {...mergeAnims(true, anims.hoverScale(1.025))}
      style={constructCSSVarsFromTheme(theme)}
    >
      <Link href={`/projects/${project.slug}`}>
        {/* Image */}
        <div className="w-full relative aspect-video">
          <Image className="object-cover"
            src={project.thumbnailImage}
            alt={project.title}
            fill
            priority
          />
        </div>

        {/* Content */}
        <motion.div className="p-2 space-y-2 flex flex-col items-center"
          {...mergeAnims(true, anims.staggerChildren(0.2))}
        >
          <motion.div {...mergeAnims(false, anims.fadeInUp())} >
            <H1 className="${theme.titleTextColor}"
              style={{
              fontSize: 'clamp(14px, 1vw + 0.5rem, 20px)',
              // marginTop: '0px',
              // marginBottom: '0px',
              margin: '0px'
              }}
            >
              {project.title}
            </H1>
          </motion.div>
          <motion.div className="flex space-x-2"
          {...mergeAnims(false, anims.staggerChildren(0.05), anims.fadeIn(0))}
          >
            {project.technologies?.map((tech) => (
              <motion.div key={tech}
              {...mergeAnims(false, anims.fadeInUp(20, 0.2))}
              >
                <motion.div className="h-4"
                {...mergeAnims(true, anims.hoverScale())}
                >
                  <IconCmp techName={tech} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
