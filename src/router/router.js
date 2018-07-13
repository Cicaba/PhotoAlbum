import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '../redux/store';
import { Provider } from 'react-redux';
import Index from '../redux/index';
import Login from '../redux/login';

let persistor = persistStore(store);
export default (
  <PersistGate loading={null} persistor={persistor}>
    <Router>
      <Provider store={store}>
        <div>
          <Route exact path='/' component={Index}></Route>
          <Route exact path='/login' component={Login}></Route>
        </div>
      </Provider>
    </Router>
  </PersistGate>
);