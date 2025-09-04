'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProjectInfo } from '@/data/projects/project';
import { useTheme } from '@/Themes/ThemeProvider';
import { anims } from '@/Themes/Default/animations';
import { mergeVariants, mergeAnims } from '@/Utils/MergeObjects';
import { motion } from 'motion/react';
import { constructCSSVarsFromTheme } from '@/Utils/ConstructCSSVarsFromTheme';
import { IconCmp } from '@/Themes/Default/Components/Icon';

export type ProjectCardTheme = {
  bgColor: string;
  bgHoverColor: string;
  borderRadius: number;
  shadowColor: string;

  titleTextColor: string;
  descriptionTextColor: string;

  forceTechIconColor: boolean;
  techIconColor: string;
};

export function ProjectCardCmp({ project }: { project: ProjectInfo }) {
  const { theme: activeTheme } = useTheme();
  const theme = activeTheme.components.card.theme;

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
          />
        </div>

        {/* Content */}
        <motion.div className="p-4 space-y-2"
          {...mergeAnims(true, anims.staggerChildren(0.2))}
        >
          <motion.h2 className="text-xl font-semibold text-[var(--titleTextColor)]"
          {...mergeAnims(false, anims.fadeInUp())}
          >
            {project.title}
          </motion.h2>
          <motion.p className="text-[var(--descriptionTextColor)]"
          {...mergeAnims(false, anims.fadeInUp())}
          >
            {project.shortDescription}
          </motion.p>
          <motion.div className="flex space-x-2"
          {...mergeAnims(false, anims.staggerChildren(0.05), anims.fadeIn(0))}
          >
            {project.technologies?.map((tech) => (
              <motion.div key={tech}
              {...mergeAnims(false, anims.fadeInUp(20, 0.2))}
              >
                <motion.div className="h-6"
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
