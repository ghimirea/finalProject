import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import product from './product';
import cart from './cart';
import order from './order';

const rootReducer = combineReducers({
  alert,
  auth,
  user,
  product,
  cart,
  order,
});

export default rootReducer;
