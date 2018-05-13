import { connect } from 'react-redux';
// import Router from '../router/router';
import login from '../view/login';

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    changeToken: (Obj) => dispatch(Obj),
    changeUserName: (Obj) => dispatch(Obj),
    changeId: (Obj) => dispatch(Obj)
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(login);

export default VisibleTodoList;