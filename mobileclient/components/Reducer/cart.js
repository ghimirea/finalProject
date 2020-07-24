import { ADD_CART, CART_FAIL } from '../Action/types';

const initialState = {
  cart: [],
  isAuth: null,
  isLoading: true,
  error: {},
};

const add_cart = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CART:
      return {
        ...state,
        cart: payload,
        isAuth: true,
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
