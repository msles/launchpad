import React, {useState, useCallback, useMemo} from "react";
import styles from "./css/PongSlider.module.css";
import useMeasure from "react-use-measure";

const PADDLE_HEIGHT_FACTOR = 0.25;

export function PaddleSlider(props: {onMove: (y: number) => void}) {

  const {onMove} = props;
  const [touchRef, touchSize] = useMeasure();
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(0);

  const {height: touchHeight, y: touchY} = touchSize;
  const paddleHeight = useMemo(() => touchHeight * PADDLE_HEIGHT_FACTOR, [touchHeight]);
  const totalHeight = useMemo(() => touchHeight - paddleHeight, [touchHeight, paddleHeight]);

  const updateY = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const y = clamp((event.clientY - touchY - paddleHeight/2) / totalHeight, 0, 1);
    setPos(y);
    onMove(y);
  }, [setPos, onMove, touchY, paddleHeight, totalHeight]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    updateY(event);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, [updateY]);

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) {
      updateY(event);
    }
  }, [dragging, updateY]);

  return <div className={styles.touch} ref={touchRef}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerMove={onPointerMove}>
    <div className={styles.paddle} style={{transform: `translateY(${Math.floor(pos * totalHeight)}px)`}}/>
  </div>
}

function clamp(x: number, min: number, max: number) {
  return Math.min(max, Math.max(min, x));
}