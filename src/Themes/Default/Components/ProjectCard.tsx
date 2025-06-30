'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects/project';
import { useTheme } from '@/Themes/ThemeProvider';
import { GetIcon } from '@/Themes/Default/Components/Icon';
import { anims } from '@/Themes/Default/animations';
import { MergeVariants } from '@/Utils/MergeObjects';
import { motion } from 'motion/react';
import { WithThemeCSSVars } from '@/Utils/Utils';
import { icons } from '@/Themes/Default/Icons';

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

export function ProjectCardCmp({ project }: { project: Project }) {
  const { theme: activeTheme } = useTheme();
  const theme = activeTheme.components.card.theme;

  const mergedVariants = MergeVariants(anims.fadeInUp(), anims.hoverScale());
  console.log('Merged variants:', mergedVariants);

  return (
    <motion.div
      className="
        overflow-hidden
        flex flex-col space-y-3
        rounded-lg
        shadow hover:shadow-2xl
        bg-[var(--bgColor)] hover:bg-[var(--bgHoverColor)]
        transition-colors
      "
      variants={anims.hoverScale(1.025)}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      style={WithThemeCSSVars(theme)}
    >
      <Link href={`/projects/${project.slug}`}>
        {/* Image */}
        <div className="w-full relative aspect-video">
          <Image
            src={project.thumbnailImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <motion.div
          className="p-4 space-y-2"
          variants={anims.staggerChildren()}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div variants={anims.fadeInUp()}>
            <h2 className="text-xl font-semibold text-[var(--titleTextColor)]">
              {project.title}
            </h2>
            <p className="text-[var(--descriptionTextColor)]">
              {project.shortDescription}
            </p>
          </motion.div>
          <div className="flex space-x-2">
            {project.technologies?.map((tech) => {
              const iconData = icons[tech as keyof typeof icons];
              const isGrayScale = iconData?.isGrayScale ?? false;

              const shouldApplyTechColor =
                theme.forceTechIconColor || isGrayScale;

              return (
                <motion.div key={tech} variants={anims.fadeInUp()}>
                  <motion.div
                    className={`h-6 ${
                      shouldApplyTechColor
                        ? 'text-[var(--techIconColor)] hover:text-[var(--techIconHoverColor)]'
                        : ''
                    }`}
                    variants={anims.hoverScale()}
                    whileHover="whileHover"
                  >
                    {GetIcon(tech)}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
