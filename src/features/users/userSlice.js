import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../config';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const res = await axios.get(`${BASE_URL}/user/me`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async (formData, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const res = await axios.put(`${BASE_URL}/user/me`, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, status: 'idle' },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => { state.status = 'loading' })
      .addCase(fetchUser.fulfilled, (state, action) => { state.status = 'succeeded'; state.data = action.payload })
      .addCase(updateUser.fulfilled, (state, action) => { state.data = action.payload });
  }
});

export default userSlice.reducer;
