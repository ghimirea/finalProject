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
  // const body = JSON.stringify({ email });
  const body = {
    email: email,
  };
  try {
    const res = await axios.patch('/users/up', body, header);
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
  try {
    const res = await axios.patch('/users/down', body, header);
    dispatch({
      type: THUMBS_DOWN,
      payload: res.data.msg,
    });
  } catch (error) {
    dispatch({
      type: RATING_FAIL,
    });
  }
};

//! Feedback Farmer
export const farmersFeedback = (email, comments) => async (dispatch) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    email: email,
    comments: comments,
  };
  try {
    const res = await axios.post('/users/comments', body, header);
    dispatch({
      type: THUMBS_DOWN,
      payload: res.data.msg,
    });
  } catch (error) {
    dispatch({
      type: RATING_FAIL,
    });
  }
};
