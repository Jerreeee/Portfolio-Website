import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'MayaReferencePlaneSetup',
  title: 'Maya Reference Plane Setup',
  thumbnailImage: 'example',
  heroImage: 'example',
  overviewMedia: ['demo', 'example'],
  shortDescription: 'A python script for Maya that helps aligning reference planes.',
mediumDescription: `This tool is a lightweight **Python script for Autodesk Maya** designed to simplify the setup of reference planes when modeling.  

It automates tasks such as importing image files, creating properly scaled image planes, and aligning them across different orthographic views (front, side, top).  
By eliminating repetitive manual steps, the tool ensures consistent alignment and speeds up the block-out workflow.`,
  technologies: {
    Core: [{ name: 'Maya' }, { name: 'Python'}],
  },

  downloads: ['Files.zip'],
};
