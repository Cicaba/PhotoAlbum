let stateData = {
  token: null,
  userName: null,
  id: null,
  menuSelected: 0,
  classify: []
};
export default (state = stateData, action) => {
  switch (action.type) {
  case 'setToken':
    return { ...state, token: action.data };
  case 'setUserName':
    return { ...state, userName: action.data };
  case 'setId':
    return { ...state, id: action.data };
  case 'setClassify':
    return { ...state, classify: action.data };
  case 'setSelected':
    return { ...state, menuSelected: action.data };
  default:
    return state;
  }
};