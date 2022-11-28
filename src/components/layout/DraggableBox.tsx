import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useEffect, useRef, useState } from 'react';
import { DisplayPosition, Position } from '../../api/layout';

interface DraggableBoxProps extends DisplayPosition {
  onChange: (position: Position) => Promise<void>
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
    const stopEditing = () => setIsEditing(false);
    const timeout = setTimeout(stopEditing, 500);
    const clear = () => clearTimeout(timeout);
    setStopTimeout({clear});
    props.onChange(editedPosition)
      .then(stopEditing)
      .finally(clear);
  }

  useEffect(() => {
    return () => stopTimeout.clear();
  }, [stopTimeout]);

  const ref = useRef<HTMLDivElement>(null);

    return <Draggable bounds="parent" onStart={handleStart} onDrag={handleDrag} onStop={handleStop} position={{x: position[0], y: position[1]}} nodeRef={ref}>
          <div ref={ref} className="box border border-dark " style={{height: '64px', width: '64px', position: 'absolute'}}> 
              <div>x: {position[0].toFixed(0)}, y: {position[1].toFixed(0)}
              </div>
          </div>
    </Draggable>
}


export default DraggableBox;