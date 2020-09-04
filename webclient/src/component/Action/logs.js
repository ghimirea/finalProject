import axios from 'axios';
import { GET_LOGS, LOGS_FAIL, ORDER_FAIL } from './types';

//! Get Logs;
export const userLogs = () => async (dispatch) => {
  try {
    const response = await axios.get('/auth/log');
    console.log('===============GET LOGS=====================');
    console.log(response);
    console.log('====================================');

    dispatch({
      type: GET_LOGS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
    });
  }
};
