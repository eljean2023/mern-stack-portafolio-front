import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../config';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
};

// New: thunk to delete user
export const deleteUser = createAsyncThunk('auth/deleteUser', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  try {
    await axios.delete(`${BASE_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Error al eliminar usuario');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.fulfilled, (state) => {
        localStorage.removeItem('token');
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, loginFailure, logout, setUser } = authSlice.actions;
export default authSlice.reducer;


