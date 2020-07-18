import axios from 'axios';
import {
  GET_PRODUCTS,
  PRODUCTS_FAIL,
  EDIT_PRODUCTS,
  GET_PRODUCT,
} from '../Action/types';

//! Get current farmer produts
export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('/products');
    console.log('FARMER PRODUCTS---->', response.data.msg);

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

//! Get particular products
export const getProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/product/${id}`);
    console.log('GET SINGLE PRODUCT--->', response.data.msg);

    dispatch({
      type: GET_PRODUCT,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};

//! Edit Products
export const editProducts = (
  id,
  { type, product_name, quantity_in_lb, price_per_lb }
) => async (dispatch) => {
  try {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      type,
      product_name,
      quantity_in_lb,
      price_per_lb,
    });

    console.log("BODY--->",body)
    const response = await axios.patch(`/products/${id}`, body, header);
    console.log('EDIT PRODUCT===========>', response.data.msg);

    dispatch({
      type: EDIT_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};
