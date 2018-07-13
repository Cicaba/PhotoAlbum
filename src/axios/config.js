import axios from "axios";
import store from "../redux/store";

axios.interceptors.request.use(config => {
  // 这里写死一个token，你需要在这里取到你设置好的token的值
  // const token = localStorage.getItem("token");
  let token = store.getState().token;
  if (token) {
    // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
    config.headers.Authorization = token;
  }
  return config;
},
error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
      case 401:
        location.hash = "/login";
        store.dispatch({ type: "setToken", data: null });
        store.dispatch({ type: "setUserName", data: null });
        store.dispatch({ type: "setId", data: null });
          // localStorage.setItem('userName', '');
          // localStorage.setItem('userId', '');
          // localStorage.setItem("token", '');
      }
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  });