"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  containerVariants, 
  itemVariants, 
  cardVariants, 
  buttonVariants,
  pageTransitionVariants,
  titleVariants,
  subtitleVariants,
  scaleHoverVariants
} from '@/animations';

export default function About() {

  return (
    <motion.div 
      className="w-full py-12 px-6 md:px-12 bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-900/10 dark:to-purple-900/10 min-h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Profile Image */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <motion.div 
              className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full overflow-hidden relative shadow-xl border border-white/50 dark:border-gray-700/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-gray-400"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.5 }}
              >
                Profile Image
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div 
            className="flex flex-col justify-center"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Welcome!
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-4"
              variants={itemVariants}
            >
            I'm Jeroen Denayer, a C++ Programmer/Techical Artist fanatical about saving unnecessary mouse-clicks!
            Having been an Artist myself, I know all about repetitive work and mindlessly repeating the same mouse-clicks to achieve the same thing for the 42th time in a single day.
            Exhousting! I say, no more! Since this realisation, my passion has been to create user-friendly tools to enhance and speed up game development.
            </motion.p>
          </motion.div>
        </div>

        {/* My Story */}
        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            My Journey
          </motion.h2>
          <motion.div 
            className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg overflow-hidden shadow-lg border border-white/50 dark:border-blue-900/20 p-8"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-4"
              variants={itemVariants}
            >
            Being in love with pretty game vistas, I started my game dev journey in 2019 by enrolling in the Game Graphics Production bachelor at Digital Arts and Entertainment (DAE) Howest Belgium.
            In the 2nd year there was an elective


            I dream of creating real-time   
            Th!s passion has grown naturally as back then, I was an artist myself studying Game Graphics Production at Howest Belgium.
            During my studies I already pivoted to using Houdini for proceduralism to save time and gain flexibility.
            This resulted in me doing my internship at Neopic (Gent) where I worked as a Technical Artist using Houdini to generate detailed worlds for Overpass 2.
            Integrating this tool into Unreal Engine so artists could use it was an immensly valuable experience.
            It made me realize how much room for workflow improvements there still is.
            Bulk offline content generation is great and wont go away, but some things just must be at the artists fingertips.
            
            and Game Development graduate from Howest Belgium.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-4 italic"
              variants={itemVariants}
            >
              During my education, I studied a comprehensive curriculum covering graphics fundamentals, applied math and physics, programming, game engine fundamentals, graphics programming, gameplay programming, tool development, and more. This broad foundation has prepared me to work in various aspects of game development.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              Today, I focus on creating breathtaking real-time productions such as games, AR and VR simulations. I'm constantly exploring new techniques and technologies to push the boundaries of what's possible in interactive experiences, balancing artistic vision with technical implementation.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Skills */}
        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            My Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-lg overflow-hidden shadow-lg border border-white/50 dark:border-purple-900/20 p-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.h3 
                className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
                variants={itemVariants}
              >
                Technical Skills
              </motion.h3>
              <motion.ul className="space-y-2" variants={containerVariants}>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">Game Development:</span>
                  <span className="text-gray-600 dark:text-gray-300">Unreal Engine, Game Engine Fundamentals, AR/VR Development</span>
                </motion.li>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">Programming:</span>
                  <span className="text-gray-600 dark:text-gray-300">C++, Python, Graphics Programming, Gameplay Programming</span>
                </motion.li>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">Technical:</span>
                  <span className="text-gray-600 dark:text-gray-300">Tool Development, Shader Development, Software Engineering</span>
                </motion.li>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">3D Graphics:</span>
                  <span className="text-gray-600 dark:text-gray-300">3D Modeling, Texturing, VFX, Animation</span>
                </motion.li>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">Other:</span>
                  <span className="text-gray-600 dark:text-gray-300">Game Sound Integration, Applied Math and Physics</span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg overflow-hidden shadow-lg border border-white/50 dark:border-blue-900/20 p-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.h3 
                className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
                variants={itemVariants}
              >
                Other Skills
              </motion.h3>
              <motion.ul className="space-y-2" variants={containerVariants}>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">All-in Development:</span>
                  <span className="text-gray-600 dark:text-gray-300">Balancing game graphics and gameplay programming for a complete experience</span>
                </motion.li>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">Problem Solving:</span>
                  <span className="text-gray-600 dark:text-gray-300">Analytical thinking and creative solutions for complex game development challenges</span>
                </motion.li>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">Technical Design:</span>
                  <span className="text-gray-600 dark:text-gray-300">Creating efficient systems and architectures for games and real-time applications</span>
                </motion.li>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">Adaptability:</span>
                  <span className="text-gray-600 dark:text-gray-300">Quick learning and mastery of new game development technologies and frameworks</span>
                </motion.li>
                <motion.li className="flex items-center" variants={itemVariants}>
                  <span className="w-1/3 font-medium">Collaboration:</span>
                  <span className="text-gray-600 dark:text-gray-300">Working effectively across disciplines in game development teams</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Beyond Game Development
          </motion.h2>
          <motion.div 
            className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-lg overflow-hidden shadow-lg border border-white/50 dark:border-green-900/20 p-8"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-4"
              variants={itemVariants}
            >
              When I'm not developing games or working on real-time applications, I enjoy exploring emerging technologies in interactive media. I'm constantly inspired by the evolving world of game engines, AR/VR, and the intersection of art and technology.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-4 italic"
              variants={itemVariants}
            >
              My education in Game Development has given me a unique perspective on how different elements of a game come together - from engine programming to graphics, from gameplay to sound integration. This holistic understanding allows me to approach projects with both technical precision and creative vision.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              I'm always open to new opportunities and collaborations in game development, interactive media, and real-time applications. Whether you need a gameplay programmer, tool developer, or all-in developer for your project, feel free to reach out to discuss how we can work together!
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
