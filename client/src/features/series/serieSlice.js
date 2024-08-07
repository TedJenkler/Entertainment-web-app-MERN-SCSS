import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAiringToday = createAsyncThunk(
    'series/airingtoday',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/api/series/airingtoday');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getOnAir = createAsyncThunk(
    'series/onair',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/api/series/onair');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getPopular = createAsyncThunk(
    'series/popular',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/api/series/popular');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getTopRated = createAsyncThunk(
    'series/toprated',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/api/series/toprated');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getTrending = createAsyncThunk(
    'series/trending',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/api/series/trending');
            return response.data;
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    airingToday: [],
    onAir: [],
    popular: [],
    topRated: [],
    trending: [],
    status: 'idle',
    error: null
};

const serieSlice = createSlice({
    name: 'series',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAiringToday.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAiringToday.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.airingToday = action.payload.series;
            })
            .addCase(getAiringToday.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getOnAir.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getOnAir.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.onAir = action.payload.series;
            })
            .addCase(getOnAir.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getPopular.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getPopular.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.popular = action.payload.series;
            })
            .addCase(getPopular.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getTopRated.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getTopRated.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.topRated = action.payload.series;
            })
            .addCase(getTopRated.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getTrending.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getTrending.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.trending = action.payload.series;
            })
            .addCase(getTrending.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default serieSlice.reducer;