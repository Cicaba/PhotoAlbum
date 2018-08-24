import { connect } from 'react-redux';
// import Router from '../router/router';
import login from '../view/login/index';

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    //修改token
    changeToken: (Obj) => dispatch(Obj),
    //修改用户名
    changeUserName: (Obj) => dispatch(Obj),
    //修改用户id
    changeId: (Obj) => dispatch(Obj),
    //分类
    changeClassify: (Obj) => dispatch(Obj),
    //控制菜单位置
    changeSelected: (Obj) => dispatch(Obj)
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(login);

export default VisibleTodoList;