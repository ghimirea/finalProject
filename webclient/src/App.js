import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './component/Navbar/navbar';
import Homepage from './component/Homepage/homepage';
import Login from './component/auth/login';
import Register from './component/auth/register';

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Route exact path='/' component={Homepage} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </>
    </BrowserRouter>
  );
}

export default App;
