import React from 'react';
import './style.css';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const LoggedPage = () => {
  return (
    <section className='bgimg'>
      <div className='overimage'>
        <div className='text'>
          <Typography variant='h1'>Welcome to Your Homepage</Typography>

          <Typography variant='h6'>
            The market that is on your fingertips....We know you missed the
            farmers market and that organic goodness, now wait no more,
            <br /> get access to all the local products right from where you are
            right now
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default LoggedPage;
