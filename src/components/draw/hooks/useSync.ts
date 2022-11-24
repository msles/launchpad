import { useEffect } from "react";
import { Mode } from "../../../api";
import { DisplayPosition } from "../../../api/layout";

export type SerializedCanvas = DisplayPixels[];
export type DisplayPixels = DisplayPosition & {pixels: number[]};

export function useSync(drawMode: Mode, disable: boolean, every: number, onCanvas: (canvas: SerializedCanvas) => void) {
  useEffect(() => {
    if (disable) return;
    const sync = drawMode.channel<void>('sync');
    const unsubscribe = drawMode.channel<SerializedCanvas>('canvas').subscribe(onCanvas);
    sync.send();
    const interval = setInterval(() => sync.send(), every);
    return () => {
      unsubscribe();
      clearInterval(interval)
    };
  }, [drawMode, every, disable, onCanvas]);
}