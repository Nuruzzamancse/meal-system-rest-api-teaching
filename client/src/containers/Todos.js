import { connect } from 'react-redux';
import * as todoActions from '../actions/todoActions';
import Todos from '../components/Todos';
// map state from store to props
const mapStateToProps = (state,ownProps) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedTodoState: state.todoState
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    fetchTodos: () => dispatch(todoActions.fetchTodos()),
    mappedDeleteTodo: todoToDelete => dispatch(todoActions.deleteTodo(todoToDelete)),
    mappedEditTodo: (todoToEdit, id) => dispatch(todoActions.editTodo(todoToEdit, id)),
    mappedshowEditModal: todoToEdit => dispatch(todoActions.showEditModal(todoToEdit)),
    mappedhideEditModal: () => dispatch(todoActions.hideEditModal()),
    mappedshowDeleteModal: todoToDelete => dispatch(todoActions.showDeleteModal(todoToDelete)),
    mappedhideDeleteModal: () => dispatch(todoActions.hideDeleteModal()),
    mappedAddTodo: todo => dispatch(todoActions.addNewTodo(todo)),
    mappedfetchTodoById: todoId => dispatch(todoActions.fetchTodoById(todoId))

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Todos);