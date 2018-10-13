const INITIAL_STATE = {
    users:[],
    user:null,
    isFetching: false,
    error: null,
    successMsg:null,
    showDeleteModal: false,
    userToDelete: null,
    showEditModal: false,
    userToEdit: null,
    token: null,
    profile: null,
    id:null
  }
  export  const userReducer = (currentState = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
  case 'FETCH_USER_REQUEST':
            return {
              ...currentState,
              users:currentState.users,
              user:null,
              isFetching: true,
              error: null,
              successMsg:null,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              userToEdit: null,
              token: null,
              profile: null,
              id:currentState.id
            }
  case 'FETCH_USER_SUCCESS':
            return {
              ...currentState,
              users:currentState.users,
              user:action.user,
              isFetching: false,
              error: null,
              successMsg:action.message,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              userToEdit: null,
              token: action.user.token,
              profile: null,
              id:action.user.user._id
            }
  case 'FETCH_USER_FAILED':
            return {
              ...currentState,
              users:[],
              user:null,
              isFetching: false,
              error: action.error,
              successMsg:null,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              todoToEdit: null,
              token: null,
              profile: null,
              id:currentState.id
            }

    case 'REGISTER_USER_REQUEST':
            return {
              ...currentState,
              users:currentState.users,
              user:null,
              isFetching: true,
              error: null,
              successMsg:null,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              userToEdit: null,
              token: null,
              profile: null,
              id:currentState.id
            }
  case 'REGISTER_USER_SUCCESS':
            return {
              ...currentState,
              users:currentState.users,
              user:action.user,
              isFetching: false,
              error: null,
              successMsg:action.message,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              userToEdit: null,
              token: action.user.token,
              profile: null,
              id:action.user.user._id
            }
  case 'REGISTER_USER_FAILED':
            return {
              ...currentState,
              users:[],
              user:null,
              isFetching: false,
              error: action.error,
              successMsg:null,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              todoToEdit: null,
              token: null,
              profile: null,
              id:currentState.id
            }
    case 'FETCH_PROFILE_REQUEST':
            return {
              ...currentState,
              users:currentState.users,
              user:null,
              isFetching: true,
              error: null,
              successMsg:null,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              userToEdit: null,
              token: null,
              id:currentState.id
            }
  case 'FETCH_PROFILE_SUCCESS':
            return {
              ...currentState,
              users:currentState.users,
              user:action.user,
              isFetching: false,
              error: null,
              successMsg:action.message,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              userToEdit: null,
              token: action.user.token,
              profile: action.profile,
              id:currentState.id
            }
  case 'FETCH_PROFILE_FAILED':
            return {
              ...currentState,
              users:[],
              user:null,
              isFetching: false,
              error: action.error,
              successMsg:null,
              showDeleteModal: false,
              userToDelete: null,
              showEditModal: false,
              todoToEdit: null,
              token: null,
              profile: null,
              id:currentState.id
            }
          
  default:
         return currentState;
  }
  }