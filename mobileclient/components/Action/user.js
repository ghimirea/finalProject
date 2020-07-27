import axios from 'axios';
import setAlert from './alert';
import { GET_FARMERS, FARMER_FAIL } from '../Action/types.js';
import authToken from '../utils/authToken';
import AsyncStorage from '@react-native-community/async-storage';

//! Get FARMERS
export const getFarmers = () => async (dispatch) => {
  //const auth_token = await AsyncStorage.token;
  // if (auth_token) {
  //   authToken(auth_token);
  // }

  try {
    console.log('BEFORE AXIOS GET FARMER');
    const res = await axios.get('/users/farmers');
    console.log('Response on GET FARMERS Action/auth=======>', res.data.msg);
    dispatch({
      type: GET_FARMERS,
      payload: res.data.msg,
    });

    
  } catch (error) {
    console.error('GET FARMER ERROR---->', error.message);
    dispatch({
      type: FARMER_FAIL,
    });
  }
};
