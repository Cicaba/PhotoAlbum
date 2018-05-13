// import React from 'react';
import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux'; import store from './redux/store';
import Routers from './router/router';
import './axios/config';
import 'amazeui-touch/dist/amazeui.touch.min.css';
import './stylus/common';

// import Connect from './redux/conect';

ReactDOM.render(Routers, document.getElementById('root'));