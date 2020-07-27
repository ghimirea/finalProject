import { GET_FARMERS, FARMER_FAIL } from '../Action/types';
import { AsyncStorage } from 'react-native';

// const get_token = async () => {
//   await AsyncStorage.getItem('token');
// };
const initialState = {
  users: [],
  // isAuth: null,
  isLoading: true,
  error: {},
};

const authetication = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FARMERS:

      return {
        ...state,
        users: payload,
        isLoading: false,
      };

    case FARMER_FAIL:
      return {
        ...state,
        error: payload,
        isAuth: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authetication;
