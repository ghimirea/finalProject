import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, getUser } from '../Action/auth';

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

const Login = ({ login, auth: { user, isAuth, isLoading } }) => {
  const classes = Styles();

  useEffect(() => {
    getUser();
  }, [getUser]);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: '',
    Active: true,
  });

  const { email, password, role, Active } = loginData;
  const onChange = (event) =>
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });

  const signIn = async (event) => {
    event.preventDefault();
    login(email, password, role, Active);
  };

  if (isAuth) {
    return <Redirect to='/localMarket' />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={(classes.paper, 'url')}>
        <div className='overimage'>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => signIn(event)}
          >
            <Grid container spacing={2}>
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
                  id='role'
                  label='Role'
                  name='role'
                  value={role}
                  onChange={(event) => onChange(event)}
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
              Login
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='/register' variant='body2'>
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, getUser })(Login);
