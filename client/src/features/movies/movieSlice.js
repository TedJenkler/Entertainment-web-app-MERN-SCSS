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

export const getPopular = createAsyncThunk(
  'movies/popular',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:2000/api/movies/popular');
      return response.data;
    }catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUpcoming = createAsyncThunk(
  'movies/upcoming',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:2000/api/movies/upcoming');
      return response.data;
    }catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTrendingMovies = createAsyncThunk(
  'movies/trending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:2000/api/movies/trending');
      return response.data
    }catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const addRating = createAsyncThunk(
  'movies/addRating',
  async ({ session_id, movie_id, rating }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2000/api/movies/rating/add', { session_id, movie_id, rating });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  topRated: [],
  nowPlaying: [],
  popular: [],
  upcoming: [],
  trending: [],
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
      })
      .addCase(getPopular.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getPopular.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popular = action.payload.movies;
      })
      .addCase(getPopular.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUpcoming.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUpcoming.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.upcoming = action.payload.movies;
      })
      .addCase(getUpcoming.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getTrendingMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trending = action.payload.movies;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addRating.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addRating.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addRating.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default movieSlice.reducer;