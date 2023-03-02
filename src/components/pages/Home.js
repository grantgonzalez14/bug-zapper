import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { auth } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../Navbar';
import './Home.css';
import '../../App.css';


function Home() {
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoggedInStatus(true);
          } else {
            setLoggedInStatus(false);
          }
      });
  }, []);

    return (
      <>
          <Navbar />
          <div className='hero-container'>
              <video src='videos/video-1.mp4' autoPlay loop muted />
              <h1>BUG ZAPPER</h1>
              <p>A web application for tracking all those nasty bugs in your code!</p>
              {!loggedInStatus &&
                  <div className='hero-btns'>
                      <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' src='/sign-up'>GET STARTED</Button>
                  </div>
              }
              {loggedInStatus &&
                  <p>Welcome, {auth.currentUser.displayName}!</p>
              }
          </div>
      </>
    )
  }

export default Home;