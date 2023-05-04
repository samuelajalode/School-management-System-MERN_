import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';
import schoolReducer from './slices/schoolSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    school: schoolReducer
  },
});
