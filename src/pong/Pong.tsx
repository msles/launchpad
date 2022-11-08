import React, {useEffect, useRef, useState} from "react";
import GameState from "./game-state";
import { PaddleSlider } from "./PaddleSlider";
import styles from "./css/Pong.module.css";

export function Pong() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [game] = useState(new GameState(["a", "b"], new Set(), [64, 64]));
  useEffect(() => {
    if (!ref.current) return;
    const context = ref.current.getContext('2d')!;
    console.dir(game);
    let handle: number|undefined = undefined;
    function run() {
      handle = requestAnimationFrame(run);
      game.render(context);
    }
    run();
    return () => {
      if (handle !== undefined) {
        cancelAnimationFrame(handle);
      }
    }
  }, [game]);
  useEffect(() => {
    let handle: number|undefined = undefined;
    function run() {
      handle = requestAnimationFrame(run);
      game.tick(1000 / 60);
    }
    run();
    return () => {
      if (handle !== undefined) {
        cancelAnimationFrame(handle);
      }
    }
  }, [game]);
  return <div className={styles.pong}>
    <PaddleSlider height={64} onMove={y => game.movePaddle('a', y)}/>
    <canvas ref={ref} width={64} height={64} style={{width: 64*4, height: 64*4}}/>
  </div>
}