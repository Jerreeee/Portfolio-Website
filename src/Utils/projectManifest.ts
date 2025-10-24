import type { MediaItem } from "@/Themes/Default/Components/Media/MediaCmp";
import { MediaManifestEntry, ProjectManifest } from "@/Types/projectManifest";

/**
 * Builds an array of MediaItems based on a list of filenames.
 *
 * @param manifest - Manifest JSON object
 * @param fileNames - Array of filenames (e.g. ["Chain_Depth.webp", "Chain_Final.webp"])
 */
export function getMediaItemsFromManifest(
  manifest: ProjectManifest,
  fileNames: string[]
): MediaItem[] {
  return fileNames.map((fileName) => {
    const entry: MediaManifestEntry = manifest.media[fileName];
    
    if (!entry) {
      console.warn(`⚠️ Media file "${fileName}" not found in manifest`);
      return {
        type: "image",
        src: fileName,
        alt: fileName,
      } as MediaItem;
    }

    switch (entry.type) {
      case "image":
        return {
          type: "image",
          src: entry.src,
          alt: entry.alt,
          width: entry.width,
          height: entry.height,
          imageProps: {},
        } satisfies MediaItem;
      case "fileVideo":
        return {
          type: "fileVideo",
          src: entry.src,
          thumbnail: entry.thumbnail,
          videoProps: {
            width: entry.width,
            height: entry.height,
          },
        } satisfies MediaItem;
      case "embeddedVideo":
        return {
          type: "embeddedVideo",
          src: entry.src,
          playerProps: {},
        } satisfies MediaItem;

      default: {
        const _exhaustive: never = entry;
        throw new Error(`Unknown media type: ${(entry as MediaManifestEntry).type}`);
      }
    }
  });
}
