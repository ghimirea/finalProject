import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOut } from '../Action/auth';
import { getUser } from '../Action/auth';

const Navbar = ({ auth: { user, isAuth, isLoading }, signOut, getUser }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

 

  const loggedInLinks =
    user && user.role === 'Admin' ? (
      <>
        <div className='navbar'>
          <Link to='/home'>Local Online</Link>
        </div>
        <ul className='nav-links'>
          <li>
            <Link to='/allorders'>All Orders</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          <li>
            <Link to='/' onClick={signOut}>
              <i className='i.fas.fa-sign-out-alt'></i> Sign Out
            </Link>
          </li>
        </ul>
      </>
    ) : (
      <>
        <div className='navbar'>
          <Link to='/home'>Local Online</Link>
        </div>
        <ul className='nav-links'>
          {/* <li>
            <Link to='/home'>Home</Link>
          </li> */}
          <li>
            <Link to='/products'>Products</Link>
          </li>
          <li>
            <Link to='/localMarket'>Orders</Link>
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
        {!isLoading && <>{isAuth ? loggedInLinks : notLoggedInLinks}</>}
      </nav>
    </>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut, getUser })(Navbar);
