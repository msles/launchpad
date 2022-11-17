import Navbar from '../Navbar/NavbarAdmin'
import React, { useContext, useState } from 'react';
import { Display, DisplayPosition, Layout, LayoutContext, Position } from '../../context/LayoutContext';

import DraggableBox from '../layoutComponents/DraggableBox';

import Button from 'react-bootstrap/Button';
import { Client } from '../../api/api';


function App(props: {client: Client}) {

    const [isFixed, setIsFixed] = useState(false)

    const layout = useContext(LayoutContext);

    const updateDisplayPosition = (display: Display, changedPosition: Position) => {
        const index = layout.findIndex(displayPos => displayPos.display === display)
        if (index == -1) {
            return layout;
        }
        return [
            ...layout.slice(0, index),
            {display: display, position: changedPosition},
            ...layout.slice(index + 1)
        ]
    }

    const submitLayoutChange = (changedLayout: Layout) => {
        props.client.channel('layout').send(changedLayout);
    }

    const displays = layout.map(({display, position}, index) => 
        <DraggableBox key={index} display={display} position={position}
            onChange={changedPosition => submitLayoutChange(updateDisplayPosition(display, changedPosition))}/>);
    // const [numberPosition, setNumberPositions] = useState([{x: 0, y: 0, isFixed: isFixed}, {x: 0, y: 0, isFixed: isFixed}])

/*
    const setBoxesVertical = () => {
        setIsFixed(true)
        setNumberPositions([{x: 0, y: 0, isFixed: true}, {x: 0, y: 100, isFixed: true}])
    }

    const setBoxesHorizontal = () => {
        setIsFixed(true)
        setNumberPositions([{x: 0, y: 0, isFixed}, {x: 100, y: 0, isFixed}])
    }

    const setBoxesCustom = () => {
        setIsFixed(false)
        setNumberPositions([{x: 0, y: 0, isFixed}, {x: 0, y: 0, isFixed}])
    }
    */

    return (
        <div>
            <Navbar />
            <div>
                <div className="border border-dark border-3 rounded container-lg" style={{ position: 'relative', height: '50vh', padding: '10px', marginBottom: '20px', marginTop: '20px'}}>
                    {displays}
                </div>
            </div>
        </div>
    )
}

/**
 * <div>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <Button variant="primary" size="lg" onClick={setBoxesVertical}>vertical</Button>
                            <Button variant="primary" size="lg" onClick={setBoxesHorizontal}>horizontal</Button>
                            <Button variant="primary" size="lg" onClick={setBoxesCustom}>custom</Button>
                        </div>
                    </div>
                </div>
            </div>
 */
export default App;