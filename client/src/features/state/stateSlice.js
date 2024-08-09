import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const search = createAsyncThunk(
    'state/search',
    async ({ query, page = 1 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:2000/api/search?query=${encodeURIComponent(query)}&page=${page}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    searchResults: [],
    searchPages: null,
    query: null,
    loading: false,
    error: null
};

const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(search.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.query = action.payload.query;
                state.searchResults = action.payload.data;
                state.searchPages = action.payload.pages;
                state.loading = false;
            })
            .addCase(search.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default stateSlice.reducer;