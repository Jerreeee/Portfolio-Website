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
  titleColor: string;
  descriptionColor: string;
  borderRadius: number;
  shadowColor: string;
};

export function ProjectCardCmp({ project }: { project: Project }) {
  const { theme } = useTheme();
  const cardTheme = theme.components.card.theme;

  const mergedVariants = MergeVariants(anims.fadeInUp(), anims.hoverScale());
  console.log("Merged variants:", mergedVariants);

  return (
    <motion.div className="overflow-hidden
      flex flex-col space-y-3
      rounded-lg shadow
      hover:shadow-2xl
    "
    variants={anims.hoverScale(1.025)}
    initial="initial" animate="animate" whileHover="whileHover"
    style={{
      backgroundColor: cardTheme.background,
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor =
        cardTheme.hoverBackground;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor =
        cardTheme.background;
    }}
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
        <motion.div className="p-4 space-y-2"
        variants={anims.staggerChildren()}
        initial="initial" animate="animate" exit="exit"
        >
          <motion.div variants={anims.fadeInUp()}>
            <h2 className="text-xl font-semibold"
            style={{ color: cardTheme.titleColor }}
            >
              {project.title}
            </h2>
            <p style={{ color: cardTheme.descriptionColor }}>
              {project.shortDescription}
            </p>
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
    </motion.div>
  );
}
