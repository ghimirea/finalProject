import axios from 'axios';
import { setALert } from '../Alert/alert';
import {
  GET_ORDERS,
  ORDER_FAIL,
  GET_ORDER,
  CHANGE_STATUS,
  ALL_ORDERS,
} from '../Action/types';

//! Get current Farmer Orders
export const getOrders = () => async (dispatch) => {
  try {
    const response = await axios.get('/orders');

    dispatch({
      type: GET_ORDERS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
    });
  }
};

//!Get particular order by ID

export const getOrder = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/orders/${id}`);

    dispatch({
      type: GET_ORDER,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
    });
  }
};

//! Change Status of the Order
export const changeStatus = (id) => async (dispatch) => {
  try {
    const response = await axios.patch(`/orders/${id}`);

    dispatch({
      type: CHANGE_STATUS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
    });
  }
};

//! Get all Orders Admin
export const getAllOrders = () => async (dispatch) => {
  try {
    const response = await axios.get('/allorders');

    dispatch({
      type: ALL_ORDERS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
    });
  }
};
