import axios from 'axios';
import setAlert from './alert';
import {
  //   SIGNUP_SUCCESS,
  //   SIGNUP_FAIL,
  GET_USER,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
} from '../Action/types.js';
import authToken from '../utils/authToken';
import { AsyncStorage } from 'react-native';

//! Get User
export const getUser = () => async (dispatch) => {
  //const auth_token = await AsyncStorage.token;
  // if (auth_token) {
  //   authToken(auth_token);
  // }

  try {
    console.log('BEFORE AXIOS GET USER');
    const response = await axios.get('/auth');
    console.log('Response on GET USER Action/auth=======>', response.data.msg);
    dispatch({
      type: GET_USER,
      payload: response.data.msg,
    });
  } catch (error) {
    console.error('GET USER ERROR---->', error.message);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// //! Register User
// export const authenticate = ({ name, email, password, role, Active }) => async (
//   dispatch
// ) => {
//   const header = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const body = JSON.stringify({ name, email, password, role, Active });

//   try {
//     const response = await axios.post('/users', body, header);
//     console.log('SIGNUP RES--->', response);

//     dispatch({
//       type: SIGNUP_SUCCESS,
//       payload: response.data.msg,
//     });

//     dispatch(getUser());
//   } catch (error) {
//     const errors = error.response.data.msg;
//     console.log(errors);

//     if (errors) {
//       errors.forEach((error) => {
//         dispatch(setAlert(error.msg, 'danger'));
//       });
//     }
//     dispatch({
//       type: SIGNUP_FAIL,
//     });
//   }
// };

//! Sign In User
export const login = (email, password, role, Active) => async (dispatch) => {
  console.log('USER EMAIL ACTION/AUTH--->', email);
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password, role, Active });
  console.log('LOGIN BODY--->', body);

  try {
    console.log('Before AXIOS');
    const response = await axios.post('/auth', body, header);
    console.log('SIGNIN RES--->', response.data.msg);

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: response.data.msg,
    });
    console.log('After dispatch siginSuccess');
    // dispatch(getUser());
  } catch (error) {
    //const errors = error.response.data.msg;
    console.log('Error signIN-->', error);

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
  console.log('Inside logout Action');
  dispatch({
    type: SIGNOUT,
    // ...state,
    // token: null,
    // isAuth: false,
    // isLoading: false,
  });
};
