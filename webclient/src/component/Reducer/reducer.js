import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import orders from './orders';
import farmer_products from './products';
import admin from './admin'
import logs from './logs'

export default combineReducers({
  alert,
  auth,
  orders,
  farmer_products,
  admin,
  logs
});
