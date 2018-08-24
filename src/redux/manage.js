import { connect } from 'react-redux';
import Manage from '../view/manage/index';

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    // changeSelected: (Obj) => dispatch(Obj)
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(Manage);

export default VisibleTodoList;