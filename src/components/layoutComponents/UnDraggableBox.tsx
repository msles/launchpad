import Draggable from 'react-draggable';
import React from 'react'

type stateType = {
  deltaPosition: {x: number, y: number}
}

function DraggableBox(props: stateType) {
    
    return (
        <Draggable bounds="parent" disabled={true} position={{x: props.deltaPosition.x, y: props.deltaPosition.y}}>
            <div className="box border border-dark " style={{height: '100px', width: '100px', position: 'absolute'}}> 
                <div>
                  BOX
                </div>
            </div>
      </Draggable>
    )
}

export default DraggableBox;