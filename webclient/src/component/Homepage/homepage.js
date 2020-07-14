import React from 'react';
import './style.css';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const homepage = () => {
  return (
    <section className='homepage'>
      <div className='overimage'>
        <div className='text'>
          <Typography variant='h1'>
            Welcome to Online Farmer's Market
          </Typography>

          <Typography variant='h6'>
            A local farm on your computer. Even Covid cannot interfere with you
            and organic goodness
          </Typography>
          <div className='buttons'>
            <Link to='/register'>
              <Button variant='contained' color='primary'>
                Register
              </Button>
            </Link>

            <Link to='/login'>
              <Button variant='contained' color='primary'>
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default homepage;
