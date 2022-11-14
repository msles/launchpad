import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import '../App.css';
import { auth } from "../config";
import { Link, useNavigate } from 'react-router-dom';
import { User as FirebaseUser } from "firebase/auth";

import Form from 'react-bootstrap/Form';

function App() {

  //const [user, setUser] = useSessionStorage('user', null);
  
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginGuest, setGuest] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user?.isAnonymous) {
      navigate("/guestPage")
    }

  }, [navigate, user])

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      navigate("/adminPage")
    } catch (e) {
      console.log(e);
      navigate("/")
    }
  };

  const loginAsGuest = async () => {
    try {
      const user = await signInAnonymously(
        auth
      );
      updateProfile(user.user, {displayName: loginGuest})
      console.log(user);
      navigate("/guestPage")
    } catch (e) {
      console.log(e);
    }
  };

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <div>
        <h1> Welcome to MSLES 🚀</h1>
        <div style={{justifyContent: 'center'}}>
          <h3> Login as Admin</h3>
            <input
              placeholder="Email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          <input
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
          }}
          />
          <button onClick={login}>Login</button>
        </div>


      <h3>Login as Player </h3>
      <div>
      <input
          placeholder="Guest Name"
          onChange={(event) => {
            setGuest(event.target.value);
          }}
        />
        <Link to="/guestPage">
          <button onClick={loginAsGuest}>Login</button>
        </Link>
      </div>
      <div>
        {auth.currentUser?.email}
      </div>
      </div>
    </div>
    )
}

export default App;