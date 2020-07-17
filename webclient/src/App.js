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

if (localStorage.token) {
  authToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(getUser());
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
              <SecuredRoute exact path='/localMarket' component={LocalMarket} />
              <SecuredRoute exact path='/products' component={LocalMarket} />
              <SecuredRoute exact path='/orders/:id' component={Order} />
            </Switch>
          </section>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
