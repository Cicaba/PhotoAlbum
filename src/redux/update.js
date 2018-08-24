import { connect } from 'react-redux';
import Updata from '../view/update/index';

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    // changeSelected: (Obj) => dispatch(Obj)
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(Updata);

export default VisibleTodoList;