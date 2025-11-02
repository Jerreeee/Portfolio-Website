import { execFile } from "child_process";
import ffprobe from "ffprobe-static";

export function getVideoDimensions(filePath: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    execFile(ffprobe.path, [
      "-v", "error",
      "-select_streams", "v:0",
      "-show_entries", "stream=width,height",
      "-of", "json",
      filePath
    ], (err, stdout) => {
      if (err) return reject(err);

      try {
        const json = JSON.parse(stdout);
        const stream = json.streams?.[0];
        resolve({
          width: stream?.width ?? 0,
          height: stream?.height ?? 0
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}
