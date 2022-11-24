import React, { useState, useRef, useEffect, useContext, useMemo, useCallback } from "react";
import useMeasure from "react-use-measure";
import { Client } from "../../api";
import { layoutBounds, Position } from "../../api/layout";
import { LayoutContext } from "../../context/LayoutContext";
import styles from "./css/Draw.module.css";
import { DisplayPixels, SerializedCanvas, useSync } from "./hooks/useSync";
import { GithubPicker } from "react-color";
import { Pixels, usePaint } from "./hooks/usePaint";

type Context2D = CanvasRenderingContext2D;

const LED_SIZE = 8;

export function Draw(props: {client: Client}) {
  const [canvasRef, ctx] = useCtx();
  const bounds = useLayoutBounds();
  const [width, height] = useCanvasBounds(bounds);
  const [containerRef, containerSize] = useMeasure();
  const [canvasWidth, canvasHeight] = toViewportSize(width, height, containerSize.width, window.innerHeight * 0.75);
  const [drawColor, setDrawColor] = useState<readonly [number, number, number]>([0, 0, 0]);
  const [drawing, setDrawing] = useState(false);
  const drawMode = props.client.mode('draw');
  const paintChannel = drawMode.channel<Pixels>('paint');
  const draw = useCallback((canvas: SerializedCanvas) => {
    if (ctx) {
      drawCanvas(ctx, canvas, [width, height]);
    }
  }, [ctx]);
  useSync(drawMode, 5_000, draw);
  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrawing(true);
  }
  const onPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDrawing(false);
  }
  usePaint(paintChannel, pixels => {
    ctx && pixels.forEach(pixel => drawLED(ctx, pixel.coordinates, pixel.color));
  });
  
  const toCoordinates = (event: React.PointerEvent<HTMLCanvasElement>): Position => {
    const {left, top} = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(bounds[0] * (event.clientX - left) / canvasWidth);
    const y = Math.floor(bounds[1] * (event.clientY - top) / canvasHeight);
    return [x, y];
  }
  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const [x, y] = toCoordinates(event);
    const coordinates = [[x, y], [x-1, y], [x+1, y], [x, y+1], [x, y-1]] as const;
    const paintPixels = coordinates.map(coords => ({coordinates: coords, color: drawColor}));
    if (drawing) {
      paintChannel.send(paintPixels);
      ctx && paintPixels.forEach(({coordinates, color}) => drawLED(ctx, coordinates, color));
    }
  }
  return <div className={styles.container} ref={containerRef}>
    <canvas ref={canvasRef} width={width} height={height}
            style={{width: canvasWidth, height: canvasHeight}}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}/>
    <div>
      <GithubPicker color={{r: drawColor[0], g: drawColor[1], b: drawColor[2]}}
        onChange={clr => setDrawColor([clr.rgb.r, clr.rgb.g, clr.rgb.b])}/>
    </div>
  </div>
}

type Color = readonly [r: number, g: number, b: number];

function toViewportSize(width: number, height: number, maxWidth: number, maxHeight: number): [number, number] {
  const byWidth = maxWidth / width;
  const byHeight = maxHeight / height;
  if (height * byWidth > maxHeight) {
    return [Math.round(width * byHeight), maxHeight];
  }
  else {
    return [maxWidth, Math.round(height * byWidth)];
  }
}

function drawCanvas(ctx: Context2D, canvas: SerializedCanvas, size: readonly [number, number]) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size[0], size[1]);
  return canvas.forEach(d => drawDisplay(ctx, d));
}

function drawDisplay(ctx: Context2D, d: DisplayPixels) {
  const [x, y] = scaleBy(d.position, LED_SIZE);
  for (let lx = 0; lx < d.display.resolution[0]; lx++) {
    for (let ly = 0; ly < d.display.resolution[1]; ly++) {
      const index = (ly * d.display.resolution[0] + lx) * 4;
      const [r, g, b] = d.pixels.slice(index, index + 3);
      drawLED(ctx, [x + lx, y + ly], [r, g, b]);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x + lx*LED_SIZE, y + ly*LED_SIZE, LED_SIZE, LED_SIZE);
    }
  }
}

function drawLED(ctx: Context2D, position: Position, color: Color) {
  ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
  ctx.fillRect(position[0]*LED_SIZE, position[1]*LED_SIZE, LED_SIZE, LED_SIZE);
}

function useCtx(): readonly [React.RefObject<HTMLCanvasElement>, Context2D|undefined] {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<Context2D|undefined>(undefined);
  const canvas = ref?.current;
  useEffect(() => {
    setCtx(canvas?.getContext('2d') ?? undefined);
  }, [canvas]);
  return [ref, ctx];
}

function useLayoutBounds(): readonly [number, number] {
  const layout = useContext(LayoutContext);
  return useMemo(() => layoutBounds(layout), [layout]);
}

function useCanvasBounds(layoutBounds: readonly [number, number]): readonly [number, number] {
  return useMemo(() => scaleBy(layoutBounds, LED_SIZE), [layoutBounds]);
}

function scaleBy(pos: Position, scale: number): readonly [number, number] {
  return [pos[0] * scale, pos[1] * scale];
}