import axios from 'axios';
import setAlert from '../Alert/alert';
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
    const response = await axios.post('/cart', body, header);

    dispatch({
      type: ADD_CART,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: CART_FAIL,
    });
  }
};

//! Get Cart
export const getCart = () => async (dispatch) => {
  try {
    const response = await axios.get('/cart');
    dispatch({
      type: GET_CART,
      payload: response.data.msg,
    });
    dispatch(setAlert('Product added successfully to the cart'));
  } catch (error) {
    dispatch({
      type: CART_FAIL,
    });
  }
};
