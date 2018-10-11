import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
import User from '../components/User';
// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedUserState: state.useState
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    mappedfetchUser: user => dispatch(userActions.fetchUser(user))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(User);