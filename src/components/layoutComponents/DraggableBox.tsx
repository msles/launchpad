import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import React, { useEffect, useRef, useState } from 'react';
import { DisplayPosition, Position } from '../../api/layout';

interface DraggableBoxProps extends DisplayPosition {
  onChange: (position: Position) => void
}

function DraggableBox(props: DraggableBoxProps) {
    
  const [editedPosition, setEditedPosition] = useState<Position>([0, 0]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [stopTimeout, setStopTimeout] = useState({clear: () => {}});

  const position = isEditing ? editedPosition : props.position;

  const handleStart = (_: DraggableEvent, data: DraggableData) => {
    setEditedPosition([data.x, data.y]);
    setIsEditing(true);
  }

  const handleDrag = (_: DraggableEvent, pos: { x: number, y: number }) => {
    setEditedPosition([pos.x, pos.y]);
  };

  const handleStop = (_: DraggableEvent) => {
    props.onChange(editedPosition);
    const timeout = setTimeout(() => {
      setIsEditing(false);
    }, 500);
    setStopTimeout({clear: () => clearTimeout(timeout)});
  }

  useEffect(() => {
    return () => stopTimeout.clear();
  }, [stopTimeout]);

  const ref = useRef<HTMLDivElement>(null);

    return <Draggable bounds="parent" onStart={handleStart} onDrag={handleDrag} onStop={handleStop} position={{x: position[0], y: position[1]}} nodeRef={ref}>
          <div ref={ref} className="box border border-dark " style={{height: '100px', width: '100px', position: 'absolute'}}> 
              <div>x: {position[0].toFixed(0)}, y: {position[1].toFixed(0)}
              </div>
          </div>
    </Draggable>
}


export default DraggableBox;