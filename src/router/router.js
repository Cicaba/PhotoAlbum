import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import store from '../redux/store';
import { Provider } from 'react-redux';
import Index from '../redux/index';
import Login from '../redux/login';

//使用默认的确认函数
const getConfirmation = (message, callback) => {
  alert();
  const allowTransition = window.confirm(message);
  callback(allowTransition);
};
let renderIndex = () => {
  console.log(store.getState().token);
  if (store.getState().token) {
    return <Index />;
  } else {
    return <Login />;
  }
};
// function requireAuthentication(Component) {
//   console.log(Component.Connect);
//   return Component;
// }
export default (
  <Router getUserConfirmation={getConfirmation}>
    <Provider store={store}>
      <div>
        <Route exact path='/' component={Index}></Route>
        {/* <Route exact path='/' component={requireAuthentication(Index)}></Route> */}
        {/* <Route exact path='/' render={renderIndex}></Route> */}
        <Route exact path='/login' component={Login}></Route>
      </div>
    </Provider>
  </Router>
);