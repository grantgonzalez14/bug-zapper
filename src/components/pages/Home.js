import React from 'react';
import { Button } from '../Button';
import './Home.css';
import '../../App.css';


function Home() {
    return (
      <div className='hero-container'>
          <video src='videos/video-1.mp4' autoPlay loop muted />
          <h1>BUG ZAPPER</h1>
          <p>A web application for tracking all those nasty bugs in your code!</p>
          <div className='hero-btns'>
              <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>GET STARTED</Button>
              <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>Watch Trailer <i className='far fa-play-circle' /></Button>
          </div>
      </div>
    )
  }

export default Home;