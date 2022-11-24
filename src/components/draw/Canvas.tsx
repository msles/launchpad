import { forwardRef, useCallback, useState } from "react";
import { Position } from "../../api/layout";

type DrawCanvasProps = {
  width: number, height: number
  maxWidth: number, maxHeight: number,
  onPaint: (point: Position) => void
};

export const Canvas = forwardRef<HTMLCanvasElement, DrawCanvasProps>((props, ref) => {
  const {width, height, maxWidth, maxHeight, onPaint: onDraw} = props;
  const [canvasWidth, canvasHeight] = toViewportSize(width, height, maxWidth, maxHeight);
  const [isPainting, setIsPainting] = useState(false);
  const onPointerDown = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPainting(true);
  }, []);
  const onPointerUp = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsPainting(false);
  }, []);
  const onPointerMove = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;
    const {left, top} = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(width * (event.clientX - left) / canvasWidth);
    const y = Math.floor(height * (event.clientY - top) / canvasHeight);
    return onDraw([x, y]);
  }, [isPainting, onDraw, width, height, canvasWidth, canvasHeight]);
  return <canvas ref={ref} width={width} height={height}
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