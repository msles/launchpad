import {BsGridFill, BsGithub, BsPencilSquare, BsDot} from 'react-icons/bs'
import {TbMinusVertical} from 'react-icons/tb'
import { Button, Card, Col, Container, Row, Image, Stack, Carousel } from 'react-bootstrap';
import pipeline from './images/msles pipeline.png'
import backside from './images/msles backside.jpg'
import battery from './images/msles battery.jpg'
import pacman from './images/msles pacman.jpg'
import dummyImg from './images/dummyImg.jpg'
import arch2 from './images/msles arch2.png'

function GuestPage() {
    return (
    <div>
        <main>
            <div>
                <div className='border-bottom text-center d-flex align-items-center justify-content-center' style={{height: '50vh'}}>
                    <div>
                        <h1 className='font-link'>M.S.L.E.S 🚀</h1>
                        <h5 >The Multi-Screen LED Entertainment System Project</h5>
                        <Button variant="dark" href='https://github.com/msles' target="_blank" rel="noreferrer"><BsGithub />  Source Code</Button>
                    </div>
                </div>
            </div> 
            <div>
                <div className='border-bottom text-center justify-content-center' style={{paddingTop: '30px'}}>
                    <div>
                        <h1 className='font-link'>What is it?</h1>
                        <p style={{fontSize: '20px'}}>M.S.L.E.S combines dynamic lighting devices, wireless connectivity, and user interactivity to create a highly engaging entertainment experience.</p>
                    </div>
                    <Container>
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '18rem', margin:'5vh', height: '11rem'}}>
                                    <Card.Body>
                                        <BsGridFill size={30}/>
                                        <Card.Title as="h2">Layout</Card.Title>
                                        <Card.Text>
                                            Change the layout of the LED boards anytime
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='d-flex justify-content-center'>
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
                            <Col className='d-flex justify-content-center'>
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
                <div className='border-bottom text-center justify-content-center' style={{paddingTop: '30px'}}>
                    <div>
                        <h1 className='font-link' style={{paddingBottom: '30px'}}>How we did it</h1>
                        <Container className='border-bottom'>
                            <Row className="justify-content-md-center">
                                <Col md>
                                    <h3 style={{textDecoration: 'underline'}}>Architecture</h3>
                                    <p> 
                                    The control server will support two different modes: drawing and pong. Each of these modes will have the same interface so the control server can delegate and swap between them.<br />
                                    The control server must keep track of which lighting devices are connected and their unique layout. It will inform the modes of the spacial arrangement of the displays, and the mode will produce frames to be rendered for each.<br />
                                    Each mode will support a set of actions. Using pong as an example, it may support moving the pong paddle to a new position, placing an obstacle, etc. The mode should tell the control server what actions are available so they can be made accessible via the HTTP/WebSocket APIs. <br />
                                    The control server will parse actions from its APIs and send them to the mode so the mode state can be updated. This might also include actions like user joined when a new player connects. When the mode state changes, a new frame will be produced for each of the displays.
                                    </p>
                                </Col>
                                <Col md>
                                    <Image rounded={true} src={arch2} fluid={true} style={{width:'60vh'}}></Image>
                                </Col>
                            </Row>
                        </Container>
                        <Container style={{padding: '20px'}} className='border-bottom'>
                            <Row className="justify-content-md-center">
                                <Col md={{ span: 6, order: 'last' }}>
                                    <h3 style={{padding: '20px', textDecoration: 'underline'}}>Pipeline</h3>
                                    <p>
                                    Once the devices are powered on and connected to the control server, they will get a default layout of being placed horizontally. The active mode is one of two: draw or pong, and while it has a active mode it will start rendering any actions the user is performing. For example, in draw mode, it will render the pixels the user is drawing on the webapp. The rendering is produced using the node-pixel-pusher protocol which helps with decoding frames to write to the LED boards.
                                    </p>
                                </Col>
                                <Col md={{ span: 6, order: 'first' }}>
                                    <Image rounded={true} src={pipeline} fluid={true} style={{width:'60vh'}}></Image>
                                </Col>
                            </Row>
                        </Container>
                        <Container style={{padding: '20px'}} className='border-bottom'>
                            <Row className="justify-content-md-center">
                                <Col md>
                                    <h3 style={{padding: '20px', textDecoration: 'underline'}}>LED Board & Raspberry Pi</h3>
                                    <p>
                                        For the purpose of the demo we bought four 64x64 RGB LED matrix panels by Adafruit and 4 Raspberry Pis. The concept of our project allows an unlimited number of LED boards to connect with each other via the control server. The Raspberry Pi is the computer to receive the information through the control server and display to the boards. <br/>
                                        Since the Raspberry Pi is a tiny computer connected to the web, we needed an easy way to first connected to the wifi. We proposed the idea of NFC, which with a single tap, we could have send the wifi configurations of one Pi to the other. This concept is possible but we didn&apos;t have time to implement it.
                                    </p>
                                </Col>
                                <Col md>
                                    <Image rounded={true} src={backside} loading="lazy" fluid={true} style={{width:'60vh'}}></Image>
                                </Col>
                            </Row>
                        </Container>
                        <Container style={{padding: '20px'}} >
                            <Row className="justify-content-md-center">
                                <Col md={{ span: 6, order: 'last' }}>
                                    <h3 style={{padding: '20px', textDecoration: 'underline'}}>Battery</h3>
                                    <p>
                                    The battery pack is a 2s3p configurations of 18650 lithium ion cells, connected to a buck converter to supply a 5V output. The pack is rated for 10,500mAH. <br/><br/>
                                    The battery concept makes the LED boards portable and convenient. Especially if this is a consumer product, a battery pack makes it more of a commercial use.
                                    
                                    </p>
                                </Col>
                                <Col md={{ span: 6, order: 'first' }}>
                                    <Image rounded={true} src={battery} loading="lazy" fluid={true} style={{width:'50vh'}}></Image>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div> 
            <div>
                <div className='border-bottom text-center justify-content-center lg' style={{paddingTop: '30px', paddingBottom: '30px'}}>
                    <div>
                        <h1 className='font-link' style={{paddingBottom: '30px', paddingTop: '30px'}}>Project Showcase</h1>
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
                        <h1 className='font-link'>Meet the Team</h1>
                    </div>
                    <Container fluid="md">
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={dummyImg} loading="lazy"/>
                                    <Card.Body>
                                        <Card.Title>Colin Boisvert</Card.Title>
                                        <Card.Text>
                                        Major: CE & CS<br/>
                                        Year: 4th
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={dummyImg} loading="lazy"/>
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
                                    <Card.Img variant="top" src={dummyImg} loading="lazy"/>
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
                                    <Card.Img variant="top" src={dummyImg} loading="lazy"/>
                                    <Card.Body>
                                        <Card.Title>James Packard</Card.Title>
                                        <Card.Text>
                                        Major: CE & CS<br/>
                                        Year: 4th
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={dummyImg} loading="lazy"/>
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