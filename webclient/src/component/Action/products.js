import axios from 'axios';
import {
  GET_PRODUCTS,
  PRODUCTS_FAIL,
  EDIT_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCTS,
  ADD_PRODUCTS,
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

    console.log('BODY--->', body);
    const response = await axios.patch(`/products/${id}`, body, header);
    console.log('EDIT PRODUCT===========>', response.data.msg);

    dispatch({
      type: EDIT_PRODUCTS,
      payload: [response.data.msg],
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};

//! Delete Products
export const deleteProduct = (id) => async (dispatch) => {
  try {
    console.log('Delete axios');
    const response = await axios.delete(`/products/${id}`);
    console.log('DELETE PRODUCT--->', response.data.msg);

    dispatch({
      type: DELETE_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};

//! Add produts
export const addProduct = ({
  type,
  product_name,
  quantity_in_lb,
  price_per_lb,
}) => async (dispatch) => {
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
    const response = await axios.post('/products/add', body, header);
    console.log('FARMER PRODUCTS---->', response.data.msg);

    dispatch({
      type: ADD_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};
