import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2000/api/users', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:2000/api/users/login', { email, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const loginTMDB = createAsyncThunk(
  'user/tmdbLogin',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const tokenResponse = await axios.get('http://localhost:2000/api/users/token');
      const request_token = tokenResponse.data.token;

      const loginData = { username, password, request_token };
      const loginResponse = await axios.post(
        'http://localhost:2000/api/users/tmdb/login', 
        loginData
      );
      
      const session = loginResponse.data.session;
      return { session };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
        localStorage.setItem("user", null)
        localStorage.setItem("email", null)
        localStorage.setItem("token", null)
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        localStorage.setItem("user", null)
        localStorage.setItem("email", null)
        localStorage.setItem("token", null)
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("user", action.payload.user.id)
        localStorage.setItem("email", action.payload.user.email)
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        localStorage.setItem("user", null)
        localStorage.setItem("email", null)
        localStorage.setItem("token", null)
      })
      .addCase(loginTMDB.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginTMDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        localStorage.setItem("session", action.payload.session.request_token);
        localStorage.setItem("expires_at", action.payload.session.expires_at);
        state.error = null;
      })
      .addCase(loginTMDB.rejected, (state, action) => {
        state.status = 'failed';
        localStorage.setItem("session", null);
        localStorage.setItem("expires_at", null);
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;