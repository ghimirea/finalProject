import axios from 'axios';
import { ADD_CART, GET_CART, CART_FAIL } from '../Action/types';

//! Add to Cart
export const add_to_cart = (
  farmer_id,
  prod_id,
  product_name,
  quantity,
  price_per_lb
) => async (dispatch) => {
  try {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      farmer_id,
      prod_id,
      product_name,
      quantity,
      price_per_lb,
    });
    console.log('PRODUCTS IN CART ACTION----->', body);
    const response = await axios.post('/cart', body, header);
    console.log('ADD TO CART ACTION---->', response.data.msg);

    dispatch({
      type: ADD_CART,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};

//! Get Cart
export const getCart = () => async (dispatch) => {
  try {
    const response = await axios.get('/cart');
    console.log('GET CART ACTION---->', response.data.msg);

    // return (dispatch) => {
    dispatch({
      type: GET_CART,
      payload: response.data.msg,
    });
    // };
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};