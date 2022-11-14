/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { deleteUser, getAuth, signOut } from "firebase/auth";
import Button from 'react-bootstrap/Button';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';


function NavbarComponent() {

    const auth = getAuth();
    const navigate = useNavigate();

    auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user)
        } else {
          console.log('waiting for user')
        }
    });

    const user = auth.currentUser;

    const [currentUser, setCurrentUser] = useState(user);
    
    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null)
        if (user?.isAnonymous) {
          deleteUser(user)
        }
        navigate("/")
      };

    function printUsername():string | null | undefined {
        if (currentUser?.displayName == null) {
            return currentUser?.email;
        } else {
            return currentUser?.displayName;
        }
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/guestPage">MSLES</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/layoutGuest">Layout</Nav.Link>
                    <Nav.Link href="/drawGuest">Draw</Nav.Link>
                    <Nav.Link href="/pongGuest">Pong</Nav.Link>
                </Nav>
                <Navbar.Brand className="justify-content-end">
                <Form className="d-flex">
                    <Navbar.Text>Signed in as: {printUsername()}</Navbar.Text>
                    <Button variant= 'dark' onClick={logout}> Sign Out </Button>
                </Form>
                </Navbar.Brand>
            </Container>
        </Navbar>
  );
}

export default NavbarComponent;
