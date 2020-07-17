import axios from 'axios';
import { GET_PRODUCTS, PRODUCTS_FAIL } from '../Action/types';

//! Get current farmer produts
export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('/products');
    console.log('FARMER PRODUCTS---->', response);

    dispatch({
      type: GET_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};
