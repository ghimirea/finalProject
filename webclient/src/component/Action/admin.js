import axios from 'axios';
import {
  ALL_USERS,
  USER_FAIL,
  CHANGE_ACTIVE,
  ACTIVE_FAIL,
  RESET_PASSWORD,
} from '../Action/types';

//! Get All Farmers
export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/users');
    console.log('RESPONSE ALL USERS-->', response.data.msg);

    dispatch({
      type: ALL_USERS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: USER_FAIL,
    });
  }
};

//! Change Status of Users
export const activeStatus = (id) => async (dispatch) => {
  try {
    const response = await axios.patch(`/users/${id}`);
    console.log('CHANGE STATUS ACTION--->', response);

    dispatch({
      type: CHANGE_ACTIVE,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: ACTIVE_FAIL,
    });
  }
};

//! Reset Password
export const resetPassword = (id) => async (dispatch) => {
  try {
    const response = await axios.patch(`/auth/${id}`);
    console.log('CHANGE STATUS ACTION--->', response);

    dispatch({
      type: RESET_PASSWORD,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: ACTIVE_FAIL,
    });
  }
};
