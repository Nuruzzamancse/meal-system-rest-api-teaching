const INITIAL_STATE = {
    todos:[],
    todo:null,
    isFetching: false,
    error: null,
    successMsg:null,
    showDeleteModal: false,
    todoToDelete: null,
    showEditModal: false,
    todoToEdit: null,
  }
  export  const userReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
  case 'FETCH_USER_REQUEST':
            return {
              ...currentState,
              todos:currentState.todos,
              todo:null,
              isFetching: true,
              error: null,
              successMsg:null,
              showDeleteModal: false,
              todoToDelete: null,
              showEditModal: false,
              todoToEdit: null,
            }
  case 'FETCH_USER_SUCCESS':
            return {
              ...currentState,
              todos:currentState.todos,
              todo:action.todo,
              isFetching: false,
              error: null,
              successMsg:action.message,
              showDeleteModal: false,
              todoToDelete: null,
              showEditModal: false,
              todoToEdit: null,
            }
  case 'FETCH_USER_FAILED':
            return {
              ...currentState,
              todos:[],
              todo:null,
              isFetching: false,
              error: action.error,
              successMsg:null,
              showDeleteModal: false,
              todoToDelete: null,
              showEditModal: false,
              todoToEdit: null,
            }
          
  default:
         return currentState;
  }
  }