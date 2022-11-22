import React, {useEffect, useRef, useState} from "react";
import GameState from "./game-state";
import { PaddleSlider } from "./PaddleSlider";
import styles from "./css/Pong.module.css";
import { Client } from "../../api/client";

export function Pong(props: {client: Client}) {
  
  const pong = props.client.mode('pong');
  const paddle = pong.channel<number>('paddle');

  /*
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
  }, [game]);*/
  function join() {
    // props.socket.send(JSON.stringify({mode: 'pong', channel: 'join', message: 'player'}));
    pong.channel('join').send('player');
  }
  function start() {
    pong.channel<void>('start').send();
  }
  function stop() {
    pong.channel<void>('stop').send();
  }
  function movePaddle(y: number) {
    paddle.send(y);
    // game.movePaddle('a', y);
  }
  return <div className={styles.pong}>
    <PaddleSlider height={64} onMove={movePaddle}/>
    <div>
      <button onClick={join}>Join</button>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
    {/*<canvas ref={ref} width={64} height={64} style={{width: 64*4, height: 64*4}}/>*/}
  </div>
}