const apiUrl = "/api";
export const toggleAddBook = () => {
  return {
    type: 'TOGGLE_ADD_TODO'
  }
}


export const fetchUser = (user) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
      // Returns a promise
      return fetch(`${apiUrl}/auth/login`, {
        method:'post',
        // headers: { 'Content-Type': 'application/json' },
        body: user,
      }).then(response => {console.log(response)
               if(response.ok){
                 response.json().then(data => {
                     console.log(data);
                   localStorage.setItem('token', data.token);
                   localStorage.setItem('name', data.user.name);
                   dispatch(fetchUserSuccess(data, data.success));
                 })
               }
               else{
                 response.json().then(error => {
                   dispatch(fetchUserFailed(error));
                 })
               }
             })
}
}

export const fetchUserRequest = () => {
  return {
    type:'FETCH_USER_REQUEST'
  }
}
//Sync action
export const fetchUserSuccess = (todo,message) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    user: todo,
    message: message,
    receivedAt: Date.now
  }
}
export const fetchUserFailed = (error) => {
  return {
    type:'FETCH_USER_FAILED',
    error
  }
}


export const registerUser = (user) => {
  console.log(user);
  return (dispatch) => {
    dispatch(registerUserRequest());
      // Returns a promise
      return fetch(`${apiUrl}/user`, {
        method:'post',
        // headers: { 'Content-Type': 'application/json' },
        body: user,
      }).then(response => {console.log(response)
               if(response.ok){
                 response.json().then(data => {
                   console.log(data);
                   localStorage.setItem('token', data.token);
                   localStorage.setItem('name', data.user.name);
                   dispatch(registerUserSuccess(data, data.success));
                 })
               }
               else{
                 response.json().then(error => {
                  registerUserFailed(fetchUserFailed(error));
                 })
               }
             })
}
}

export const registerUserRequest = () => {
  return {
    type:'REGISTER_USER_REQUEST'
  }
}
//Sync action
export const registerUserSuccess = (user,message) => {
  return {
    type: 'REGISTER_USER_SUCCESS',
    user: user,
    message: message,
    receivedAt: Date.now
  }
}
export const registerUserFailed = (error) => {
  return {
    type:'REGISTER_USER_FAILED',
    error
  }
}
