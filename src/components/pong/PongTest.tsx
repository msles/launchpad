import { useEffect, useRef, useState } from "react";
import { Canvas } from "../draw/Canvas";
import GameState from "./game-state";
import { PaddleSlider } from "./PaddleSlider";

export function PongTest() {
  const width = 64;
  const height = 64;
  const ref = useRef<HTMLCanvasElement>(null);
  const [game] = useState(new GameState(["a", "b"], new Set(), [width, height]));
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
    <Canvas ref={ref} width={width} height={height} 
    onPaint={() => {}}
    maxWidth={width * 2} maxHeight={height * 2}/>
  </div>
}