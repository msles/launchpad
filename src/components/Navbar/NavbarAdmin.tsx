/* eslint-disable @typescript-eslint/no-misused-promises */
import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {

  const auth = getAuth();
  const navigate = useNavigate();

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (user.isAnonymous) {
        navigate('/guestPage');
      } else {
        setCurrentUser(user)
      }
    } else {
      console.log('waiting for user')
    }
  });

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    navigate('/');
  };

  const user = auth.currentUser

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (currentUser?.isAnonymous) {
      navigate('/guestPage');
    }
}, [navigate, currentUser]);


  return (
    <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/adminPage">MSLES</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/layoutAdmin">Layout</Nav.Link>
                <Nav.Link href="/drawAdmin">Draw</Nav.Link>
                <Nav.Link href="/pongAdmin">Pong</Nav.Link>
            </Nav>
            <Navbar.Brand className="justify-content-end">
                <Form className="d-flex">
                    <Navbar.Text>Signed in as: {currentUser?.email}</Navbar.Text>
                    <Button variant= 'dark' onClick={logout}> Sign Out </Button>
                </Form>
                </Navbar.Brand>
            </Container>
        </Navbar>
    </>
  );
}

export default NavbarComponent;