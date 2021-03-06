import { connect } from 'react-redux';
import Index from '../view/index/index';

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    // changeSelected: (Obj) => dispatch(Obj)
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(Index);

export default VisibleTodoList;