import axios from 'axios';
import setAlert from './alert';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GET_USER,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
} from '../Action/types';
import authToken from '../utils/authToken';

//! Get User
export const getUser = () => async (dispatch) => {
  if (localStorage.token) {
    authToken(localStorage.token);
  }

  try {
    const response = await axios.get('/auth');
    dispatch({
      type: GET_USER,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//! Register User
export const authenticate = ({ name, email, password, role, Active }) => async (
  dispatch
) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password, role, Active });

  try {
    const response = await axios.post('/users', body, header);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data.msg,
    });

    dispatch(getUser());
  } catch (error) {
    const errors = error.response.data.msg;
    console.log(errors);

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

//! Sign In User
export const login = (email, password, role, Active) => async (dispatch) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password, role, Active });

  try {
    const response = await axios.post('/auth', body, header);

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: response.data.msg,
    });

    dispatch(getUser());
  } catch (error) {
    // if (error) {
    //   error.forEach((error) => {
    //     dispatch(setAlert(error.msg, 'danger'));
    //   });
    // }
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

//! Sign Out User
export const signOut = () => (dispatch) => {
  dispatch({
    type: SIGNOUT,
  });
};
