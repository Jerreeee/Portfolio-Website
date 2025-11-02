import { MediaItem } from "@/Types/media";
import { MediaMetaDataItem } from "@/Types/media";
import { ProjectManifest } from "@/Types/projectManifest";

export function toMediaItem(meta: MediaMetaDataItem): MediaItem {
  return {
    ...meta,
    type: meta.type,
  } as MediaItem;
}

export function getMediaItemsFromManifest(
  manifest: ProjectManifest,
  fileNames: string[]
): MediaItem[] {
  return fileNames.flatMap((fileName) => {
    const entry = manifest.media[fileName];
    if (!entry) {
      console.warn(`⚠️ Media file "${fileName}" not found in manifest`);
      return [];
    }
    return entry ? toMediaItem(entry) : [];
  });
}

