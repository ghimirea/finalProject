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
    console.log("Farmer's Order--->", response);

    dispatch({
      type: GET_ORDERS,
      payload: response.data.msg,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
      //   payload: { msg: error.response, status: error.response.status },
    });
  }
};

//!Get particular order by ID

export const getOrder = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/orders/${id}`);
    console.log('RESPONSE PARTICULAR ORDER-->', response);

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
    console.log('PATCH ORDER-->', response);

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
    console.log('RESPONSE ALL ORDERS-->', response.data.msg);

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
