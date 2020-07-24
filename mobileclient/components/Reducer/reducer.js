import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import product from './product';

const rootReducer = combineReducers({
  alert,
  auth,
  user,
  product,
});

export default rootReducer;
