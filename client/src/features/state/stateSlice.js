import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const search = createAsyncThunk(
    'state/search',
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:2000/api/search/${query}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    searchResults: [],
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
                state.searchResults = action.payload.data;
                state.loading = false;
            })
            .addCase(search.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default stateSlice.reducer;