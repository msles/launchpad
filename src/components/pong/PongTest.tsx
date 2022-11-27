import { useEffect, useRef, useState } from "react";
import { Canvas } from "../draw/Canvas";
import GameState from "./game-state";
import { PaddleSlider } from "./PaddleSlider";

export function PongTest() {
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
  return <div>
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
    <PaddleSlider onMove={y => game.movePaddle('a', y)}/>
    <PaddleSlider onMove={y => game.movePaddle('b', y)}/>
    </div>
    <Canvas ref={ref} width={64} height={64} 
    onPaint={() => {}}
    maxWidth={128} maxHeight={128}/>
  </div>
}