import { THUMBS_UP, THUMBS_DOWN, COMMENTS, RATING_FAIL } from '../Action/types';
import { AsyncStorage } from 'react-native';

// const get_token = async () => {
//   await AsyncStorage.getItem('token');
// };
const initialState = {
  comments: '',

  isLoading: true,
  error: {},
};

const rateFarmer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case THUMBS_UP:
    case THUMBS_DOWN:
    case COMMENTS:

      console.log('GET COMMENTS--->', payload);
      state = {
        ...state,
        comments: payload,

        isLoading: false,
      };

    case RATING_FAIL:

      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default rateFarmer;
