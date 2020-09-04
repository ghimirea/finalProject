import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import product from './product';
import cart from './cart';
import order from './order';
import ratings from './ratings'

const rootReducer = combineReducers({
  alert,
  auth,
  user,
  product,
  cart,
  order,
  ratings
});

export default rootReducer;
