import Draggable from 'react-draggable';
import React, { useState } from 'react';

type stateType = {
  deltaPosition: {x: number, y: number, isFixed: boolean}
}


function DraggableBox(props: stateType) {

    const dragStateStart: stateType = {
        deltaPosition: {
          x: props.deltaPosition.x, y: props.deltaPosition.y, isFixed: props.deltaPosition.isFixed
        }
      };

    const [dragState, setDragState] = useState(dragStateStart);
    
    const handleDrag = (e: any, pos: { deltaX: number; deltaY: number; }) => {
        const {x, y} = dragState.deltaPosition;
        setDragState({
          deltaPosition: {
            x: x + pos.deltaX,
            y: y + pos.deltaY,
            isFixed: false
          }
        });
    };

    return (
      <Draggable bounds="parent" onDrag={handleDrag} positionOffset={{x: props.deltaPosition.x, y: props.deltaPosition.y}}>
          <div className="box border border-dark " style={{height: '100px', width: '100px', position: 'absolute'}}> 
              <div>x: {dragState.deltaPosition.x.toFixed(0)}, y: {dragState.deltaPosition.y.toFixed(0)}
              </div>
          </div>
    </Draggable>
    )

    /* if (props.deltaPosition.isFixed) {
      return (
        <Draggable bounds="parent" onDrag={handleDrag} position={{x: props.deltaPosition.x, y: props.deltaPosition.y}}>
            <div className="box border border-dark " style={{height: '100px', width: '100px', position: 'absolute'}}> 
                <div>x: {dragState.deltaPosition.x.toFixed(0)}, y: {dragState.deltaPosition.y.toFixed(0)}
                </div>
            </div>
      </Draggable>
      )
    } else {
      return (
        <Draggable bounds="parent" onDrag={handleDrag} positionOffset={{x: props.deltaPosition.x, y: props.deltaPosition.y}}>
            <div className="box border border-dark " style={{height: '100px', width: '100px', position: 'absolute'}}> 
                <div>x: {dragState.deltaPosition.x.toFixed(0)}, y: {dragState.deltaPosition.y.toFixed(0)}
                </div>
            </div>
      </Draggable>
      )
    } */

    
}


export default DraggableBox;