import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import orders from './orders';

export default combineReducers({
  alert,
  auth,
  orders,
});
