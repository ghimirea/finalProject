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

//! Get particular products
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

//! Edit Products
export const editProducts = (
  id,
  { type, product_name, quantity_in_lb, price_per_lb }
) => async (dispatch) => {
  console.log(
    'Inside edit action',
    type,
    product_name,
    quantity_in_lb,
    price_per_lb
  );
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

    const response = await axios.patch(`/products/${id}`, body, header);

    console.log('RESPONSE ON EDIT ACTION---->', response.data.msg);

    dispatch({
      type: EDIT_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
    });
  }
};

//! Delete Products
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/products/${id}`);

    dispatch({
      type: DELETE_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
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

    dispatch({
      type: ADD_PRODUCTS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
    });
  }
};
