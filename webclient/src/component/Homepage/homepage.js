import React from 'react';
import './style.css';
import { Button, Typography } from '@material-ui/core';

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
            <a href='#'>
              <Button variant='contained' color='primary' href='#'>
                Register
              </Button>
            </a>

            <a href='#'>
              <Button variant='contained' color='primary' href='#'>
                Login
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default homepage;
