import axios from 'axios';
import setAlert from './alert';
import { GET_FARMERS, FARMER_FAIL } from '../Action/types.js';
import authToken from '../utils/authToken';
import AsyncStorage from '@react-native-community/async-storage';

//! Get FARMERS
export const getFarmers = () => async (dispatch) => {
  const auth_token = await AsyncStorage.getItem('token');
  if (auth_token) {
    authToken(auth_token);
  }

  try {
    const res = await axios.get('/users/farmers');
    dispatch({
      type: GET_FARMERS,
      payload: res.data.msg,
    });
  } catch (error) {
    dispatch({
      type: FARMER_FAIL,
    });
  }
};
