import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './App.reducer';
import signupReducer from './SignUp.reducer';
import loginReducer from './Login.reducer';
import profileReducer from './Profile.reducer';
import bankReducer from './Bank.reducer';

export default combineReducers({
  app:appReducer,
  signup:signupReducer,
  login:loginReducer,
  profile:profileReducer,
  bank:bankReducer,
  routing:routerReducer,
})
