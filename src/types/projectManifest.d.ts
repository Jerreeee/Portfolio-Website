export type ImageManifestItem = {
  type: "image";
  src: string;
  width: number;
  height: number;
};

export type FileVideoManifestItem = {
  type: "fileVideo";
  src: string;
  width: number;
  height: number;
  thumbnail?: string;
};

export type EmbeddedVideoManifestItem = {
  type: "embeddedVideo";
  src: string;
  width?: number;
  height?: number;
};

export type ManifestEntry =
  | ImageManifestItem
  | FileVideoManifestItem
  | EmbeddedVideoManifestItem;

export type ProjectManifest = {
  media: {
    [fileName: string]: ManifestEntry;
  };
};
