import React from 'react';

const navbar = () => {
  return (
    <>
      <nav>
        <div className='navbar'>
          <h4>Local Online</h4>
        </div>
        <ul className='nav-links'>
          <li>
            <a href='index.html'>Home</a>
          </li>
          <li>
            <a href='#'>Register</a>
          </li>
          <li>
            <a href='#'>Login</a>
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
