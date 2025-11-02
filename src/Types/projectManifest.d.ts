import { MediaItem } from "./media";

export type ProjectManifest = {
  media: {
    [fileName: string]: MediaItem; 
  };
};

export type Media = ProjectManifest['media'];
