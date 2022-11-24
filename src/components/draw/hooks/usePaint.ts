import { useEffect } from "react";
import { Mode } from "../../../api";
import { Position } from "../../../api/layout";

export type PaintCommand = {
  color: Color,
  pixels: Position[]
};

export type Color = readonly [number, number, number];

export function usePaint(drawMode: Mode, onPixels: (pixels: PaintCommand[]) => void) {
  useEffect(() => {
    return drawMode.channel<PaintCommand[]>('paint').subscribe(onPixels);
  }, [drawMode, onPixels]);
}
