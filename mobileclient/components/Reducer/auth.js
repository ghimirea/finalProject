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

const setToken = async (token) => {
  await AsyncStorage.setItem('token', token);
};

const getToken = async () => {
  await AsyncStorage.getItem('token');
};

const clearToken = async () => {
  await AsyncStorage.removeItem('token');
};

const initialState = {
  token: '',
  isAuth: null,
  isLoading: null,
  user: null,
};

const authetication = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:


      setToken(payload);

      return {
        ...state,
        payload,
        isAuth: true,
        isLoading: false,
      };
    case SIGNOUT:
      clearToken();
      return {
        ...state,
        token: null,
        isAuth: false,
        isLoading: false,
      };

    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case SIGNIN_FAIL:
      // case SIGNOUT:
      // await AsyncStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        isLoading: false,
      };
    case GET_USER:
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
