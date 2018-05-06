import React from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import store from '../redux/store';
import Index from '../redux/connect';
import Login from '../view/login';

//使用默认的确认函数
const getConfirmation = (message, callback) => {
  alert();
  const allowTransition = window.confirm(message);
  callback(allowTransition);
};
export default(
  <Router getUserConfirmation={getConfirmation}>
    <Provider store={store}>
      <div>
        <Route exact path='/' component={Index}></Route>
        <Route exact path='/login' component={Login}></Route>
      </div>
    </Provider>
  </Router>
);