import { GET_PRODUCTS, PRODUCTS_FAIL } from '../Action/types';

const initialState = {
  products: [],
  isLoading: true,
  error: {},
};

const farmer_products = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default farmer_products;
