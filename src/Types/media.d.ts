export type MediaType = 'image' | 'fileVideo' | 'embeddedVideo';

export interface SharedMetaData {
  fileType: string;
}

export interface ImageMetaData extends SharedMetaData{
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: number;
};

export interface FileVideoMetaData extends SharedMetaData {
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  thumbnail?: string;
};

export interface EmbeddedVideoMetaData extends SharedMetaData {
  src: string;
  width?: number;
  height?: number;
};

export const mediaMetaDataTypes = {
  image: {} as ImageMetaData,
  fileVideo: {} as FileVideoMetaData,
  embeddedVideo: {} as EmbeddedVideoMetaData,
};

export type MediaMetaDataItem = {
  [K in keyof typeof mediaMetaDataTypes]: { type: K } & typeof mediaMetaDataTypes[K];
}[keyof typeof mediaMetaDataTypes];

export interface ImageMediaItem extends ImageMetaData {
  imageProps?: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>;
};

export interface FileVideoMediaItem extends FileVideoMetaData {
  videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
};

export interface EmbeddedVideoMediaItem extends EmbeddedVideoMetaData {
  playerProps?: Omit<React.ComponentProps<typeof ReactPlayer>, 'url'>;
};

export const mediaTypes = {
  image: {} as ImageMediaItem,
  fileVideo: {} as FileVideoMediaItem,
  embeddedVideo: {} as EmbeddedVideoMediaItem,
};

export type MediaItem = {
  [K in keyof typeof mediaTypes]: { type: K } & typeof mediaTypes[K];
}[keyof typeof mediaTypes];
