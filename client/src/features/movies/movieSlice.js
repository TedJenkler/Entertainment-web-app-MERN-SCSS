import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTopRated = createAsyncThunk(
  'movies/toprated',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:2000/api/movies/toprated');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getNowPlaying = createAsyncThunk(
    'movies/nowplaying',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/api/movies/nowplaying');
            return response.data;
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
  topRated: [],
  nowPlaying: [],
  status: 'idle',
  error: null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopRated.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTopRated.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topRated = action.payload.movies;
    })
      .addCase(getTopRated.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getNowPlaying.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getNowPlaying.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nowPlaying = action.payload.movies;
    })
      .addCase(getNowPlaying.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default movieSlice.reducer;