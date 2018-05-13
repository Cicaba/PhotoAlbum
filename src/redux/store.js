import { createStore } from 'redux';
let store = createStore((state, action) => {
  state || (state = {
    token: null,
    userName: null,
    id: null
  });
  switch (action.type) {
  case 'setToken':
    return Object.assign(state, { token: action.data });
  case 'setUserName':
    return Object.assign(state, { userName: action.data });
  case 'setId':
    return Object.assign(state, { id: action.data });
  default:
    return state;
  }
});
export default store;