import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/NavbarGuest'
import React from 'react'
import { Github, Grid } from 'react-bootstrap-icons';
import {BsGridFill, BsGithub, BsPencilSquare, BsDot} from 'react-icons/bs'
import {TbMinusVertical} from 'react-icons/tb'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';


function App() {
    return (
    <div>
        <header >
            <Navbar />
        </header>
        <main>
            <div>
                <div className='border text-center d-flex align-items-center justify-content-center' style={{height: '50vh'}}>
                    <div>
                        <h1>M.S.L.E.S</h1>
                        <h5>The Multi-Screen LED Entertainment System Project</h5>
                        <Button variant="dark" href='https://github.com/msles'><BsGithub />  Source Code</Button>
                    </div>
                </div>
            </div> 
            <div>
                <div className='text-center justify-content-center' style={{height: '50vh', paddingTop: '30px'}}>
                    <div>
                        <h1>Overview</h1>
                        <p style={{fontSize: '20px'}}>M.S.L.E.S combines dynamic lighting devices, wireless connectivity, and user interactivity to create a highly engaging entertainment experience.</p>
                    </div>
                    <Container>
                        <Row className="justify-content-md-center text-center">
                            <Col md="auto">
                                <Card style={{ width: '18rem', margin:'5vh'}}>
                                    <Card.Body>
                                        <BsGridFill size={30}/>
                                        <Card.Title as="h2">Layout</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the cards content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="auto">
                                <Card style={{ width: '18rem', margin:'5vh'}}>
                                    <Card.Body>
                                        <BsPencilSquare size={30}/>
                                        <Card.Title as="h2">Draw</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the cards content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="auto">
                                <Card style={{ width: '18rem', margin:'5vh'}}>
                                    <Card.Body>
                                        <TbMinusVertical size={30}/><BsDot/><TbMinusVertical size={30}/>
                                        <Card.Title as="h2">Pong</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the cards content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <div>
                        
                    </div>
                </div>  
            </div>     
        </main>
    </div>
    )
}

export default App;