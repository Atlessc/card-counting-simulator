
import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='NavBar-Container'>
      <h2>Card Counting Help</h2>
      <Link to='/'>
      <button className='NavBar-Button'>Home</button>
      </Link>
    </div>
  );
}

export default NavBar;
