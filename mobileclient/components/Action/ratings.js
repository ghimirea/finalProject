import axios from 'axios';
import setAlert from './alert';
import {
  THUMBS_UP,
  THUMBS_DOWN,
  COMMENTS,
  RATING_FAIL,
} from '../Action/types.js';
import authToken from '../utils/authToken';
import AsyncStorage from '@react-native-community/async-storage';

//! Like FARMERS
export const likeFarmers = (email) => async (dispatch) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email });
  console.log('ACTION LIKE FARMER----->', body, header);
  try {
    console.log('BEFORE LIKING FARMER');
    const res = await axios.patch('/users/up', body, header);
    console.log('Response on Like=======>', res.data.msg);
    dispatch({
      type: THUMBS_UP,
      payload: res.data.msg,
    });
  } catch (error) {
    console.error('GET LIKE ERROR---->', error.message);
    dispatch({
      type: RATING_FAIL,
    });
  }
};

//! Dislike a Farmer
export const disLikeFarmers = (email) => async (dispatch) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email });
  console.log('ACTION LIKE FARMER----->', body, header);
  try {
    console.log('BEFORE LIKING FARMER');
    const res = await axios.patch('/users/down', body, header);
    console.log('Response on DisLike=======>', res.data.msg);
    dispatch({
      type: THUMBS_DOWN,
      payload: res.data.msg,
    });
  } catch (error) {
    console.error('GET DISLIKE ERROR---->', error.message);
    dispatch({
      type: RATING_FAIL,
    });
  }
};

//! Feedback Farmer
export const farmersFeedback = (email, comments) => async (dispatch) => {
  console.log('ACTION COMMENT COMMENTS--->', comments);
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // const body = JSON.stringify( {email, comments} );

  const body = {
    email: email,
    comments: comments,
  };
  console.log('ACTION COMMENT FARMER----->', body, header);
  try {
    console.log('BEFORE COMMENTING FARMER');
    const res = await axios.post('/users/comments', body, header);
    console.log('Response on COMMENTS =======>', res.data.msg);
    dispatch({
      type: THUMBS_DOWN,
      payload: res.data.msg,
    });
  } catch (error) {
    console.error('GET COMMENTS ERROR---->', error.message);
    dispatch({
      type: RATING_FAIL,
    });
  }
};
