'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GetIcon } from '@/Themes/Default/Components/Icon';
import { Project } from '@/data/projects/project';
import { useTheme } from '@/Themes/ThemeProvider';
import { anims } from '@/Themes/Default/animations';
import { MergeVariants } from '@/Utils/MergeObjects';
import { motion } from 'motion/react';

export type CardTheme = {
  background: string;
  hoverBackground: string;
  textColor: string;
  borderRadius: number;
  shadowColor: string;
};

export function ProjectCardCmp({ project }: { project: Project }) {
  const { theme } = useTheme();
  const cardTheme = theme.components.card.theme;

  const mergedVariants = MergeVariants(anims.fadeInUp(), anims.hoverScale());
  console.log("Merged variants:", mergedVariants);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`
        flex flex-col space-y-3
        rounded-lg shadow
        transform transition
        hover:shadow-2xl
        overflow-hidden
      `}
      style={{
        backgroundColor: cardTheme.background,
        color: cardTheme.textColor,
      }}
      onMouseEnter={(e) => {
        if (cardTheme.hoverBackground) {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            cardTheme.hoverBackground;
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          cardTheme.background;
      }}
    >
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
      <motion.div className="p-4 space-y-2"
      variants={anims.staggerChildren()}
      initial="initial" animate="animate" exit="exit"
      >
        <motion.div variants={anims.fadeInUp()}>
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <p>{project.shortDescription}</p>
        </motion.div>
        <div className="flex space-x-2">
          {project.technologies?.map((tech) => (
            <motion.div key={tech} variants={anims.fadeInUp()}>
              <motion.div className="h-6"
              variants={anims.hoverScale()}
              whileHover="whileHover"
              >
                  {GetIcon(tech)}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Link>
  );
}
