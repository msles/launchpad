import React, {useRef, useCallback} from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import styles from "./css/PongSlider.module.css";
import useMeasure from "react-use-measure";

export function PaddleSlider(props: {height: number, onMove: (y: number) => void}) {
  const {height, onMove} = props;
  const dragRef = useRef<HTMLDivElement>(null);
  const [containerRef, size] = useMeasure();
  const onDrag = useCallback((_event: DraggableEvent, data: DraggableData) => {
    onMove(Math.floor(height * data.y / size.height + height / 8));
  }, [size, height, onMove]);
  return <div className={styles.slider} ref={containerRef}>
    <Draggable axis="y" nodeRef={dragRef} bounds="parent" onDrag={onDrag}>
      <div className={styles.paddle} ref={dragRef}></div>
    </Draggable>
  </div>
}