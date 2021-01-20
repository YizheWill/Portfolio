import React from 'react';
import { Typography, Button } from '@material-ui/core';
import './Navbar.css';

function Navbar() {
  return (
    <div className='Navbar'>
      <Typography className='Navbar__logo' style={{ fontSize: 50, fontWeight: 'bold' }}>
        WILL
      </Typography>
      <div className='Navbar__navlinks'>
        <Button className='Navbar__navlink' style={{ color: 'white' }}>
          Home
        </Button>
        <Button className='Navbar__navlink'>About</Button>
        <Button className='Navbar__navlink'>Resume</Button>
        <Button className='Navbar__navlink'>Portfolio</Button>
        <Button className='Navbar__navlink'>Blog</Button>
        <Button className='Navbar__navlink'>Contact</Button>
      </div>
    </div>
  );
}

export default Navbar;
