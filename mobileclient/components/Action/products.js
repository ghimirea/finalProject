import axios from 'axios';
import { GET_PRODUCTS, PRODUCTS_FAIL } from '../Action/types';

//! Get current farmer produts
export const getFarmerProducts = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/products/${id}`);

    dispatch({
      type: GET_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
    });
  }
};

// //! Get particular products
export const getProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/product/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
    });
  }
};

