import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/NavbarGuest'
import React from 'react'


function App() {
    return (
        <>
        <Navbar />
        <div>
            Guest Page
        </div>
        </>
    )
}

export default App;