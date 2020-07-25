import { MAKE_ORDER, ORDER_FAIL } from './types';
import axios from 'axios';

//! Make Order
export const makeOrder = () => async (dispatch) => {
  try {
      const response = await axios.get('/order');
      console.log('MAKE ORDER---->', response)

      dispatch({
          type:MAKE_ORDER,
          payload:response.data.msg
      })
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: ORDER_FAIL,
    });
  }
};
