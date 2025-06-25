import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
    error: null
  },
  reducers: {
    registerRequest: (state) => {
      state.status = 'loading';
      state.message = null;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.status = 'failed';
      state.message = null;
      state.error = action.payload;
    },
    resetRegister: (state) => {
      state.status = 'idle';
      state.message = null;
      state.error = null;
    }
  }
});

export const { registerRequest, registerSuccess, registerFailure, resetRegister } = registerSlice.actions;

export default registerSlice.reducer;
