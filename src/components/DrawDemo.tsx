import React from "react";
import useMeasure from "react-use-measure";

export function DrawDemo(props: {socket: WebSocket}) {
  const [ref, size] = useMeasure()
  return <div style={{width: 600, height: 300, backgroundColor: 'white'}} ref={ref}
    onMouseMove={event => {
      props.socket.send(JSON.stringify({
        mode: 'mode/draw',
        channel: 'paint',
        message: [
          {coordinates: [
            Math.floor(64 * 2 * (event.clientX - size.x) / size.width),
            Math.floor(64 * Math.abs(size.y - event.clientY) / size.height)
          ], color: randomColor()}
        ]
      }))
    }}
    />
}

function randomColor(): [number, number, number] {
  return [
    randomMax(255),
    randomMax(255),
    randomMax(255)
  ]
}

function randomMax(max: number): number {
  return Math.floor(Math.random() * max);
}