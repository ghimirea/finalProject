import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import orders from './orders';
import products from './products';
import admin from './admin'

export default combineReducers({
  alert,
  auth,
  orders,
  products,
  admin
});
