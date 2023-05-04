import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    loggin: (state, action )=> {
          state.user = action.payload;
    },
    logout: state => {
       console.log(state);
       state.user = null;
    },
    update: (state, action) => {
        state.user = Object.assign({}, state.user, action.payload);
    }
  },
});


export const { loggin, logout, update } = userSlice.actions;

export const selectUser = state => state.user.user;


export const handleSignout = () => dispatch => {
     console.log('signed out')
      localStorage.clear();
      dispatch(logout());
}
export default userSlice.reducer;
