import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  'user/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2000/api/users', { username, email, password });
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

export const getUserByUsername = createAsyncThunk(
  'user/getUserByUsername',
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:2000/api/users/username', {
        params: { username },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
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

      return loginResponse.data;
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
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        localStorage.setItem("user", action.payload.user.id);
        localStorage.setItem("email", action.payload.user.email);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
      })
      .addCase(loginTMDB.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginTMDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        localStorage.setItem("session", action.payload.session);
        localStorage.setItem("user", action.payload.username);
        console.log(action.payload);
        state.error = null;
      })
      .addCase(loginTMDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        localStorage.removeItem("session");
      })
      .addCase(getUserByUsername.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(getUserByUsername.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;