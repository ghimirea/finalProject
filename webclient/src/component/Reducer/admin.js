import {
  ALL_USERS,
  USER_FAIL,
  CHANGE_ACTIVE,
  ACTIVE_FAIL,
  RESET_PASSWORD,
} from '../Action/types';

const initialState = {
  users: [],
  isLoading: true,
  error: {},
};

const admin_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_USERS:
      return {
        ...state,
        users: payload,
        isLoading: false,
      };
    case CHANGE_ACTIVE:
    case RESET_PASSWORD:
      return {
        ...state,
        payload,
        isLoading: false,
      };
    case USER_FAIL:
    case ACTIVE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default admin_reducer;
