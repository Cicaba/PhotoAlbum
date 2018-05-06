import {createStore} from 'redux';
let store = createStore((state, action) => {
  state = {
    height: '555px'
  };
  switch (action.type) {
  case 'setHeight':
    return state.height = [action.data];
  default:
    return state;
  }
}, ['Use Redux']);

store.dispatch({type: 'setHeight', data: '99px'});
console.log(store.getState());
export default store;