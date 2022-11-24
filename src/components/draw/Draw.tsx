import { useState, useRef, useContext, useMemo, useCallback } from "react";
import useMeasure from "react-use-measure";
import { Client } from "../../api";
import { layoutBounds, Position } from "../../api/layout";
import { LayoutContext } from "../../context/LayoutContext";
import styles from "./css/Draw.module.css";
import { DisplayPixels, SerializedCanvas, useSync } from "./hooks/useSync";
import { GithubPicker, ColorResult } from "react-color";
import { PaintCommand, usePaint } from "./hooks/usePaint";
import { Button } from "react-bootstrap";
import { Canvas } from "./Canvas";

const LED_SIZE = 8;

export function Draw(props: {client: Client}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layout = useContext(LayoutContext);
  const [containerRef, containerSize] = useMeasure();
  const [drawColor, setDrawColor] = useState<readonly [number, number, number]>([0, 0, 0]);
  const drawMode = props.client.mode('draw');
  const paintChannel = drawMode.channel<PaintCommand>('paint');
  const [width, height] = useMemo(() => layoutBounds(layout), [layout]);
  const [syncDisabled, setSyncDisabled] = useState(false);
  const draw = useCallback((canvas: SerializedCanvas) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      drawCanvas(ctx, canvas, [width, height]);
    }
  }, []);
  useSync(drawMode, syncDisabled, 5_000, draw);
  usePaint(drawMode, commands => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx && commands.forEach(command => drawLEDs(ctx, command));
  });
  const onPaint = (point: Position) => {
    const [px, py] = point;
    const [x, y] = [Math.floor(px / LED_SIZE), Math.floor(py / LED_SIZE)];
    const coordinates = [[x, y], [x-1, y], [x+1, y], [x, y+1], [x, y-1]] as const;
    const pixels = coordinates
      .filter(coords => layout.some(({display, position}) => inBounds(coords, position, display.resolution)))
    const command = {color: drawColor, pixels};
    paintChannel.send(command);
    const ctx = canvasRef.current?.getContext('2d');
    ctx && drawLEDs(ctx, command);
  }
  return <div className={styles.container} ref={containerRef}>
    <Canvas ref={canvasRef} onPaint={onPaint}
                onPaintStart={() => setSyncDisabled(true)}
                onPaintStop={() => setSyncDisabled(false)}
                width={width * LED_SIZE} height={height * LED_SIZE}
                maxWidth={containerSize.width} maxHeight={window.innerHeight * 0.75}/>
    <div>
      <GithubPicker color={{r: drawColor[0], g: drawColor[1], b: drawColor[2]}}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        onChange={(clr: ColorResult) => setDrawColor([clr.rgb.r, clr.rgb.g, clr.rgb.b])}/>
      <Button onClick={() => drawMode.channel<void>('clear').send()}>Clear</Button>
    </div>
  </div>
}

type Context2D = CanvasRenderingContext2D;

function inBounds(coordinates: Position, rectPos: Position, rectSize: Position): boolean {
  const [x, y] = coordinates;
  const [w, h] = rectSize;
  return (x >= rectPos[0] && x < rectPos[0] + w && y >= rectPos[1] && y < rectPos[1] + h);
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
      drawLEDs(ctx, {pixels: [[x + lx, y + ly]], color: [r, g, b]});
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x + lx*LED_SIZE, y + ly*LED_SIZE, LED_SIZE, LED_SIZE);
    }
  }
}

function drawLEDs(ctx: Context2D, pixels: PaintCommand) {
  ctx.fillStyle = `rgb(${pixels.color[0]},${pixels.color[1]},${pixels.color[2]})`;
  pixels.pixels.forEach(p => ctx.fillRect(p[0]*LED_SIZE, p[1]*LED_SIZE, LED_SIZE, LED_SIZE));
}

function scaleBy(pos: Position, scale: number): readonly [number, number] {
  return [pos[0] * scale, pos[1] * scale];
}