import { useEffect } from "react";
import { Channel } from "../../../api";

export type PaintPixel = {
  coordinates: readonly [number, number],
  color: readonly [number, number, number]
};

export type Pixels = PaintPixel[];

export function usePaint(paintChannel: Channel<Pixels>, onPixels: (pixels: Pixels) => void) {
  useEffect(() => {
    return paintChannel.subscribe(onPixels);
  }, [paintChannel, onPixels]);
}
