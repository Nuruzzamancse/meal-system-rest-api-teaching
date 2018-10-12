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
    token: null
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
              token: null
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
              token: action.user.token
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
              token: null
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
              token: null
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
              token: action.user.token
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
              token: null
            }
          
  default:
         return currentState;
  }
  }