const {
  GET_ORDERS,
  ORDER_FAIL,
  GET_ORDER,
  CHANGE_STATUS,
  ALL_ORDERS,
} = require('../Action/types');

const initialState = {
  orders: [],
  isLoading: true,
  error: {},
};

const farmerOrder = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS:
    case ALL_ORDERS:
      return {
        ...state,
        orders: payload,
        isLoading: false,
      };
    case GET_ORDER:
      return {
        ...state,
        orders: payload,
        isLoading: false,
      };
    case ORDER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case CHANGE_STATUS:
      return {
        ...state,
        orders: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default farmerOrder;
