import { connect } from 'react-redux';
import Menu from '../view/menu/index';

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelected: (Obj) => dispatch(Obj)
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default VisibleTodoList;