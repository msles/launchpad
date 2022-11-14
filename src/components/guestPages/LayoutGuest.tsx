import React from 'react';
import Navbar from '../Navbar/NavbarGuest'
import { useState } from 'react';

import UnDraggableBox from '../layoutComponents/UnDraggableBox';

function App() {

    const [numberPosition, setNumberPositions] = useState([{x: 0, y: 0}, {x: 0, y: 100}])

    return (
        <>
        <Navbar />
        <div>
            <div className="border border-dark rounded container-lg" style={{ position: 'relative', height: '50vh', padding: '10px', marginBottom: '20px', marginTop: '20px'}}>
                {numberPosition.map((pos, index) => <UnDraggableBox key={index} deltaPosition={pos}/>)}
            </div>
        </div>
        </>
        
    )
}

export default App;