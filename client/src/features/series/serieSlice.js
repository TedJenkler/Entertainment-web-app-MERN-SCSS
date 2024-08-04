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

const initialState = {
    airingToday: [],
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
            });
    }
});

export default serieSlice.reducer;