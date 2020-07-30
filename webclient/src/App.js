import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './component/Navbar/navbar';
import Homepage from './component/Homepage/homepage';
import Login from './component/auth/login';
import Register from './component/auth/register';
import { Provider } from 'react-redux';
import store from './component/Store/store';
import Alert from '../src/component/Alert/alert';
import { getUser } from './component/Action/auth';
import authToken from './component/utils/authToken';
import LocalMarket from './component/localMarket/localMarket';
import SecuredRoute from './component/securedRoute/securedRoute';
import Order from './component/Order/order';
import Products from './component/Products/products';
import UpdateProducts from './component/Products/updateProduct';
import AddProduct from './component/Products/addProducts';
import AllOrder from './component/Order/allOrder';
import AllUsers from './component/Admin/allUsers';
import LoggedPage from './component/Homepage/loggedInHomepage';

if (localStorage.token) {
  authToken(localStorage.token);
}

function App() {
  useEffect(() => {
    const y = store.dispatch(getUser());
    console.log('APP.JS USEEFFECT------>', y);
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Navbar />
          <Route exact path='/' component={Homepage} />
          <section>
            <Alert />

            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <SecuredRoute exact path='/home' component={LoggedPage} />
              <SecuredRoute exact path='/localMarket' component={LocalMarket} />
              <SecuredRoute exact path='/products' component={Products} />
              <SecuredRoute exact path='/products/add' component={AddProduct} />
              <SecuredRoute
                exact
                path='/products/:id'
                component={UpdateProducts}
              />
              <SecuredRoute exact path='/orders/:id' component={Order} />
              <SecuredRoute exact path='/allorders' component={AllOrder} />
              <SecuredRoute exact path='/users' component={AllUsers} />
            </Switch>
          </section>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
