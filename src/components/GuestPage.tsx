import {BsGridFill, BsGithub, BsPencilSquare, BsDot} from 'react-icons/bs'
import {TbMinusVertical} from 'react-icons/tb'
import { Button, Card, Col, Container, Row, Image, Stack, Carousel } from 'react-bootstrap';
import architecture from './images/msles architecture.png'
import pipeline from './images/msles pipeline.png'
import backside from './images/msles backside.png'
import battery from './images/msles battery.png'
import pacman from './images/msles pacman.png'
import dummyImg from './images/dummyImg.png'

function GuestPage() {
    return (
    <div>
        <main>
            <div>
                <div className='border-bottom text-center d-flex align-items-center justify-content-center' style={{height: '50vh'}}>
                    <div>
                        <h1>M.S.L.E.S</h1>
                        <h5>The Multi-Screen LED Entertainment System Project</h5>
                        <Button variant="dark" href='https://github.com/msles' target="_blank" rel="noreferrer"><BsGithub />  Source Code</Button>
                    </div>
                </div>
            </div> 
            <div>
                <div className='border-bottom text-center justify-content-center' style={{paddingTop: '30px'}}>
                    <div>
                        <h1>What is it?</h1>
                        <p style={{fontSize: '20px'}}>M.S.L.E.S combines dynamic lighting devices, wireless connectivity, and user interactivity to create a highly engaging entertainment experience.</p>
                    </div>
                    <Container>
                        <Row className="justify-content-md-center text-center">
                            <Col md="auto">
                                <Card style={{ width: '18rem', margin:'5vh', height: '11rem'}}>
                                    <Card.Body>
                                        <BsGridFill size={30}/>
                                        <Card.Title as="h2">Layout</Card.Title>
                                        <Card.Text>
                                            Change the layout of the LED board anytime
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="auto">
                                <Card style={{ width: '18rem', margin:'5vh', height: '11rem'}}>
                                    <Card.Body>
                                        <BsPencilSquare size={30}/>
                                        <Card.Title as="h2">Draw</Card.Title>
                                        <Card.Text>
                                            Draw in real time without latency in your preferred layout
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="auto">
                                <Card style={{ width: '18rem', margin:'5vh', height: '11rem'}}>
                                    <Card.Body>
                                        <TbMinusVertical size={30}/><BsDot/><TbMinusVertical size={30}/>
                                        <Card.Title as="h2">Pong</Card.Title>
                                        <Card.Text>
                                        Play pong with friends across the web
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>  
            </div>    
            <div>
                <div className='text-center justify-content-center' style={{paddingTop: '30px'}}>
                    <div>
                        <h1 style={{paddingBottom: '30px'}}>How we do it</h1>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col md>
                                    <h3>Architecture</h3>
                                    <p> 
                                    The control server will support two different modes: drawing and pong. Each of these modes will have the same interface so the control server can delegate and swap between them.<br />
                                    The control server must keep track of which lighting devices are connected and their unique layout. It will inform the modes of the spacial arrangement of the displays, and the mode will produce frames to be rendered for each.<br />
                                    Each mode will support a set of actions. Using pong as an example, it may support moving the pong paddle to a new position, placing an obstacle, etc. The mode should tell the control server what actions are available so they can be made accessible via the HTTP/WebSocket APIs. <br />
                                    The control server will parse actions from its APIs and send them to the mode so the mode state can be updated. This might also include actions like user joined when a new player connects. When the mode state changes, a new frame will be produced for each of the displays.
                                    </p>
                                </Col>
                                <Col md>
                                    <Image src={architecture} fluid={true} style={{width:'60vh'}}></Image>
                                </Col>
                            </Row>
                        </Container>
                        <Container style={{padding: '20px'}}>
                            <Row className="justify-content-md-center">
                                <Col md={{ span: 6, order: 'last' }}>
                                    <h3 style={{padding: '20px'}}>Pipeline</h3>
                                    <p>
                                    Once the devices are powered on and connected to the control server, they will get a default layout of being placed horizontally. The active mode is one of two: draw or pong, and while it has a active mode it will start rendering any actions the user is performing. For example, in draw mode, it will render the pixels the user is drwaing on the webapp. The rendering is produced using the node-pixel-pusher protocol which helps with decoding frames to write to the LED boards.
                                    </p>
                                </Col>
                                <Col md={{ span: 6, order: 'first' }}>
                                    <Image src={pipeline} fluid={true} style={{width:'60vh'}}></Image>
                                </Col>
                            </Row>
                        </Container>
                        <Container style={{padding: '20px'}}>
                            <Row className="justify-content-md-center">
                                <Col md>
                                    <h3 style={{padding: '20px'}}>LED Board and Raspberry Pi</h3>
                                    <p>
                                        ....
                                    </p>
                                </Col>
                                <Col md>
                                    <Image src={backside} fluid={true} style={{width:'60vh'}}></Image>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div> 
            <div>
                <div className='text-center justify-content-center' style={{paddingTop: '30px'}}>
                    <div>
                        <h1 style={{paddingBottom: '30px'}}>Project Showcase</h1>
                    </div>
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <Image
                            className="justify-content-center w-50"
                            rounded={true} 
                            src={pacman}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3 style={{color: 'white'}}>Drawing Pacman</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                            className="justify-content-center w-50"
                            rounded={true} 
                            src={pacman}
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3 style={{color: 'white'}}>Layout placement</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                            className="justify-content-center w-50"
                            rounded={true} 
                            src={pacman}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3 style={{color: 'white'}}>Playing Pong</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
            <div>
                <div className='text-center justify-content-center' style={{paddingTop: '30px'}}>
                    <div>
                        <h1>Meet the Team</h1>
                    </div>
                    <Container fluid="md">
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={dummyImg} />
                                    <Card.Body>
                                        <Card.Title>Colin Boisvert</Card.Title>
                                        <Card.Text>
                                        Major: <br/>
                                        Year: 4th
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={dummyImg} />
                                    <Card.Body>
                                        <Card.Title>William Hsia</Card.Title>
                                        <Card.Text>
                                        Major: CE & CS<br/>
                                        Year: 4th
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={dummyImg} />
                                    <Card.Body>
                                        <Card.Title>Sean Magee</Card.Title>
                                        <Card.Text>
                                        Major: EE<br/>
                                        Year: 4th
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={dummyImg} />
                                    <Card.Body>
                                        <Card.Title>James Packard</Card.Title>
                                        <Card.Text>
                                        Major:<br/>
                                        Year: 4th
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={dummyImg} />
                                    <Card.Body>
                                        <Card.Title>Owen Zhang</Card.Title>
                                        <Card.Text>
                                        Major: EE<br/>
                                        Year: 4th 
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div> 
        </main>
        <Container style={{padding:'20px'}}>
            <Stack direction='horizontal'>
                <div>@ 2022, MSLES. All rights reserved </div>
            </Stack>
        </Container>
    </div>
    )
}

export default GuestPage;