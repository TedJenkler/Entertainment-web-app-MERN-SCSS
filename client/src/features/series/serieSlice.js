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

const initialState = {
    airingToday: [],
    onAir: [],
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
            });
    }
});

export default serieSlice.reducer;