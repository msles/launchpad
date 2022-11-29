import React, { forwardRef, useCallback, useState } from "react";
import { Position } from "../../api/layout";
import styles from "./css/Canvas.module.css";

type DrawCanvasProps = {
  width: number, height: number
  maxWidth: number, maxHeight: number,
  onPaintStart?: () => void,
  onPaintStop?: () => void,
  onPaint: (point: Position) => void
};

export const Canvas = forwardRef<HTMLCanvasElement, DrawCanvasProps>((props, ref) => {
  const {width, height, maxWidth, maxHeight, onPaint, onPaintStart, onPaintStop} = props;
  const [canvasWidth, canvasHeight] = toViewportSize(width, height, maxWidth, maxHeight);
  const [isPainting, setIsPainting] = useState(false);
  const toCanvasCoordinates = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    const {left, top} = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(width * (event.clientX - left) / canvasWidth);
    const y = Math.floor(height * (event.clientY - top) / canvasHeight);
    return [x, y] as const;
  }, [width, height, canvasWidth, canvasHeight]);
  const onPointerDown = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPainting(true);
    onPaintStart?.();
    onPaint(toCanvasCoordinates(event));
  }, [onPaintStart, onPaint]);
  const onPointerUp = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsPainting(false);
    onPaintStop?.();
  }, [onPaintStop]);
  const onPointerMove = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;
    return onPaint(toCanvasCoordinates(event));
  }, [isPainting, onPaint, toCanvasCoordinates]);
  return <canvas ref={ref} className={styles.canvas} width={width} height={height}
    style={{width: canvasWidth, height: canvasHeight}}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerMove={onPointerMove}/>
});
Canvas.displayName = 'Canvas';

function toViewportSize(width: number, height: number, maxWidth: number, maxHeight: number): Position {
  const byWidth = maxWidth / width;
  const byHeight = maxHeight / height;
  if (height * byWidth > maxHeight) {
    return [Math.round(width * byHeight), maxHeight];
  }
  else {
    return [maxWidth, Math.round(height * byWidth)];
  }
}