import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import { todoReducer } from './todoReducer';
import { userReducer } from './userReducer';
export default combineReducers({
  appState:appReducer,
  todoState:todoReducer,
  userState: userReducer,
  routing
  // More reducers if there are
  // can go here
})