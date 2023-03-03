import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
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
              {!isMobile && <video src='videos/video-1.mp4' autoPlay loop muted />}
              {isMobile && <img src='images/Bug_Zapper_Mobile_Home_Background.png' alt='Background for Bug Zapper Home Screen Mobile'/>}
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