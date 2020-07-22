import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GET_USER,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
} from '../Action/types';
import { AsyncStorage } from 'react-native';

// const getToken = async () => {
//   return await AsyncStorage.getItem('token');
// };
// console.log('Async Storage get====>', getToken());

// const setToken = async (data) => {
//   return await AsyncStorage.setItem('token', data);
// };
// console.log('Async Storage set====>', setToken());

// const removeToken = async () => {
//   return await AsyncStorage.removeItem('token');
// };

const initialState = {
  token: AsyncStorage.getItem('token'),
  isAuth: null,
  isLoading: null,
  user: null,
};

const authetication = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      AsyncStorage.setItem('token', payload).then(() => {
        console.log('Async Storage--->', payload);
      });
      console.log('Token--->', payload);
      return {
        ...state,
        payload,
        isAuth: true,
        isLoading: false,
      };

    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case SIGNIN_FAIL:
    case SIGNOUT:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        isLoading: false,
      };
    case GET_USER:
      console.log('GET USER--->', payload);
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: payload,
      };
    default:
      return state;
  }
};

export default authetication;
