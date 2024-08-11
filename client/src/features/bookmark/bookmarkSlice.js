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

const initialState = {
    watchlistmovies: [],
    watchlistseries: [],
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
            });
    }
});

export default bookmarkSlice.reducer;