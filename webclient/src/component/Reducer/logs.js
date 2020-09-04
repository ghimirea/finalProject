import { GET_LOGS, LOGS_FAIL } from '../Action/types';

const initialState = {
  logs: [],
  isLoading: true,
  error: {},
};

const getLogs = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LOGS:
      return {
        ...state,
        logs: payload,
        isLoading: false,
      };

    case LOGS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default getLogs;
