import Navbar from '../Navbar/NavbarAdmin'
import React, { useState } from 'react';

import DraggableBox from '../layoutComponents/DraggableBox';

import Button from 'react-bootstrap/Button';


function App() {

    const [isFixed, setIsFixed] = useState(false)

    const [numberPosition, setNumberPositions] = useState([{x: 0, y: 0, isFixed: isFixed}, {x: 0, y: 0, isFixed: isFixed}])

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
                    {numberPosition.map((pos, index) => <DraggableBox key={index} deltaPosition={pos}/>)}
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