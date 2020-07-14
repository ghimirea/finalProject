import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { Link } from 'react-router-dom';
import Login from '../auth/login';
import './style.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Styles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = Styles();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Farmer',
  });

  const { name, email, password, confirmPassword, role } = registerData;
  const onChange = (event) =>
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });

  const signUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
    } else {
      console.log('User Details--->', registerData);
      const newUser = {
        name,
        email,
        password,
        role,
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newUser);
        console.log('Body--->', body);

        const response = await axios.post('/users', body, config);
        console.log('Response--->', response);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={(classes.paper, 'url')}>
        <div className='overimage'>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => signUp(event)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='name'
                  name='name'
                  variant='outlined'
                  required
                  fullWidth
                  value={name}
                  onChange={(event) => onChange(event)}
                  id='name'
                  label='Full Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={email}
                  onChange={(event) => onChange(event)}
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={password}
                  onChange={(event) => onChange(event)}
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  minLength='6'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={confirmPassword}
                  onChange={(event) => onChange(event)}
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='role'
                  label='Role'
                  name='role'
                  value='Farmer'
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
