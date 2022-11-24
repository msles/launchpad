import { useEffect } from "react";
import { Mode } from "../../../api";
import { DisplayPosition } from "../../../api/layout";

export type SerializedCanvas = DisplayPixels[];
export type DisplayPixels = DisplayPosition & {pixels: number[]};

export function useSync(drawMode: Mode, every: number, onCanvas: (canvas: SerializedCanvas) => void) {
  useEffect(() => {
    const unsubscribe = drawMode.channel<SerializedCanvas>('canvas').subscribe(onCanvas);
    drawMode.channel<void>('sync').send();
    return unsubscribe;
  }, [drawMode, onCanvas]);
  useEffect(() => {
    const sync = drawMode.channel<void>('sync');
    const interval = setInterval(() => sync.send(), every);
    return () => clearInterval(interval);
  }, [drawMode, every]);
}