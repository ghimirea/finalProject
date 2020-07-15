import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOut } from '../Action/auth';

const navbar = ({ auth: { isAuth, isLoading }, signOut }) => {
  //console.log('Navbar Auth====>', auth);

  const loggedInLinks = (
    <>
      <div className='navbar'>
        <Link to='/localMarket'>Local Online</Link>
      </div>
      <ul className='nav-links'>
        <li>
          <Link to='/localMarket'>Home</Link>
        </li>
        <li>
          <Link to='/products'>Products</Link>
        </li>
        <li>
          <Link to='/orders'>Orders</Link>
        </li>
        <li>
          <Link to='/' onClick={signOut}>
            <i className='i.fas.fa-sign-out-alt'></i> Sign Out
          </Link>
        </li>
      </ul>
    </>
  );

  const notLoggedInLinks = (
    <>
      <div className='navbar'>
        <Link to='/'>Local Online</Link>
      </div>
      <ul className='nav-links'>
        {/* <li>
      <Link to='/'>Home</Link>
    </li> */}
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </>
  );
  return (
    <>
      <nav>
        {/* <div className='hamburger'>
          <div className='line1'></div>
          <div className='line2'></div>
          <div className='line3'></div>
        </div> */}
        {!isLoading && <>{isAuth ? loggedInLinks : notLoggedInLinks}</>}
      </nav>
    </>
  );
};

navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(navbar);
