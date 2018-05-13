import { connect } from 'react-redux';
// import Router from '../router/router';
import login from '../view/login';

const mapStateToProps = state => {
  return { token: state.token };
};

const mapDispatchToProps = dispatch => {
  return {
    changeToken: (Obj) => dispatch(Obj)
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(login);

export default VisibleTodoList;