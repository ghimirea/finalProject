import { MAKE_ORDER, ORDER_FAIL, ORDER_HISTORY } from '../Action/types';

const initialState = {
  orders: [],
  isLoading: true,
  error: {},
};

const customerOrder = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MAKE_ORDER:
    case ORDER_HISTORY:
      return {
        ...state,
        orders: payload,
        isLoading: false,
      };
    case ORDER_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default customerOrder;
