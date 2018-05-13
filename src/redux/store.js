import { createStore } from 'redux';
let store = createStore((state, action) => {
  state = {
    token: null
  };
  switch (action.type) {
  case 'changeToken':
    return { state: action.data };
  default:
    return state;
  }
}, ['Use Redux']);
export default store;