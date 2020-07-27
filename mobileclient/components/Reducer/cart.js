import { ADD_CART, CART_FAIL, GET_CART } from '../Action/types';

const initialState = {
  cart: [],
  isLoading: true,
  error: {},
};

const add_cart = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CART:
    case GET_CART:
      return {
        ...state,
        cart: payload,
        isLoading: false,
      };

    case CART_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default add_cart;
