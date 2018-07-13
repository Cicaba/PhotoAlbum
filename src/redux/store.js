import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';
let persistedReducer = persistReducer({ key: 'auto', storage }, reducer);
let store = createStore(persistedReducer);

export default store;