import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import registerReducer from './features/register/registerSlice'; 

export default configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer
  }
});


/*
import { configureStore } from '@reduxjs/toolkit';
//import authReducer from '../features/auth/authSlice';
//import userReducer from '../features/user/userSlice';
import userSlice  from './features/auth/authSlice';
import authSlice from './features/auth/authSlice';

export default configureStore({
  reducer: { auth: authSlice, user: userSlice }
});

*/