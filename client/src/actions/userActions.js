const apiUrl = "/api/auth/";
export const toggleAddBook = () => {
  return {
    type: 'TOGGLE_ADD_TODO'
  }
}


export const fetchUser = (id) => {
  return (dispatch) => {
    dispatch(fetchTodoRequest());
      // Returns a promise
      return fetch(`${apiUrl}${id}`)
             .then(response => {console.log(response)
               if(response.ok){
                 response.json().then(data => {
                     console.log(data);
                   dispatch(fetchTodoSuccess(data.todo, data.message));
                 })
               }
               else{
                 response.json().then(error => {
                   dispatch(fetchTodoFailed(error));
                 })
               }
             })
}
}
export const fetchTodoRequest = () => {
  return {
    type:'FETCH_TODO_REQUEST'
  }
}
//Sync action
export const fetchTodoSuccess = (todo,message) => {
  return {
    type: 'FETCH_TODO_SUCCESS',
    todo: todo,
    message: message,
    receivedAt: Date.now
  }
}
export const fetchTodoFailed = (error) => {
  return {
    type:'FETCH_TODO_FAILED',
    error
  }
}
