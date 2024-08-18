import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addList = createAsyncThunk(
    'list/addList',
    async ({ session_id, name, description, language }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:2000/api/lists/add', { session_id, name, description, language });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const details = createAsyncThunk(
    'list/details',
    async ({ listid }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:2000/api/lists/details', { listid });
            return response.data;
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAll = createAsyncThunk(
    'list/getAll',
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:2000/api/lists/all', { account_id });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    modal: false,
    modalData: {},
    lists: [],
    listDetails: [],
    status: 'idle',
    error: null,
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        toggleModal(state, action) {
            state.modal = !state.modal;
            if (state.modal === false) {
                state.modalData = {};
            } else {
                state.modalData = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(addList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lists = action.payload.data.results;
                state.error = null;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(details.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(details.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listDetails = action.payload;
                state.error = null;
            })
            .addCase(details.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export const { toggleModal } = listSlice.actions;

export default listSlice.reducer;