import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addFavorite = createAsyncThunk(
    'favorite/add',
    async({ userid, media_type, media_id }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:2000/api/favorite/add', { userid, media_type, media_id });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getFavoriteMovies = createAsyncThunk(
    'favorite/movies',
    async (userid, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/api/favorite/movies', { params: { userid } });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getFavoriteSeries = createAsyncThunk(
    'favorite/series',
    async (userid, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/api/favorite/series', { params: { userid } });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    favoriteMovies: [],
    favoriteSeries: [],
    error: null,
    status: 'idle'
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getFavoriteMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFavoriteMovies.fulfilled, (state, action) => {
                state.favoriteMovies = action.payload.data.results;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(getFavoriteMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getFavoriteSeries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFavoriteSeries.fulfilled, (state, action) => {
                state.favoriteSeries = action.payload.data.results;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(getFavoriteSeries.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default favoriteSlice.reducer;