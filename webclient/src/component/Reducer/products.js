import {
  GET_PRODUCTS,
  GET_PRODUCT,
  PRODUCTS_FAIL,
  EDIT_PRODUCTS,
  DELETE_PRODUCTS,
  ADD_PRODUCTS,
} from '../Action/types';

const initialState = {
  products: [],
  isLoading: true,
  error: {},
};

const farmer_products = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
    case EDIT_PRODUCTS:
    case DELETE_PRODUCTS:
    case GET_PRODUCT:
    case ADD_PRODUCTS:
      state = {
        ...state,
        products: payload,
        isLoading: false,
      };
      break; //! Recent Add

    case PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        products: payload,
        error: payload,
      };

    default:
      return state;
  }
};

export default farmer_products;
