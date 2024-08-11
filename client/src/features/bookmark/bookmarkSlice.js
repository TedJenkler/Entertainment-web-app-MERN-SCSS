import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addBookmark = createAsyncThunk(
    'bookmark/add',
    async ({ userid, media_type, media_id }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:2000/api/bookmark/add', 
                { userid, media_id, media_type }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getMovies = createAsyncThunk(
    'bookmark/getMovies',
    async (userid, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:2000/api/bookmark/movies', 
                { params: { userid }}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getSeries = createAsyncThunk(
    'bookmark/getSeries',
    async (userid, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:2000/api/bookmark/series', 
                { params: { userid }}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    watchlistMovies: [],
    watchlistSeries: [],
    status: 'idle',
    error: null
};

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBookmark.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addBookmark.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addBookmark.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchlistMovies = action.payload.data.results;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getSeries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSeries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchlistSeries = action.payload.data.results;
            })
            .addCase(getSeries.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default bookmarkSlice.reducer;