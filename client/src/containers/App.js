import { connect } from 'react-redux';
import * as appActions from '../actions/appActions';
import App from '../components/App';
import * as todoActions from '../actions/todoActions';
import * as userActions from '../actions/userActions';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedAppState: state.appState,
    mappedUserState: state.userState
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    mappedToggleAddTodo: () => dispatch(appActions.toggleAddTodo()),
    mappedAddTodo: todo => dispatch(todoActions.addNewTodo(todo)),
    mappedAddUser: user => dispatch(userActions.fetchUser(user)),
    mappedRegisterUser: user => dispatch(userActions.registerUser(user))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);