import { connect } from 'react-redux';
import * as appActions from '../actions/appActions';
import App from '../components/App';
import * as userActions from '../actions/userActions';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedUserState: state.userState
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    mappedAddUser: user => dispatch(userActions.fetchUser(user)),
    mappedRegisterUser: user => dispatch(userActions.registerUser(user)),
    mappedFetchProfile: () => dispatch(userActions.fetchProfile())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);