import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <>
      <nav>
        <div className='navbar'>
          <h4>Local Online</h4>
        </div>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
        <div className='hamburger'>
          <div className='line1'></div>
          <div className='line2'></div>
          <div className='line3'></div>
        </div>
      </nav>
    </>
  );
};

export default navbar;
