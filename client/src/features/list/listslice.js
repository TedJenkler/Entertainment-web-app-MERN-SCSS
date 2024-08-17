import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addList = createAsyncThunk(
    'list/addlist',
    async ({ session_id, name, description, language }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:2000/api/lists/add', { session_id, name, description, language });
            return response.data;
        } catch (error) {
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
    lists: [],
    state: 'idle',
    error: null,
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        toggleModal(state) {
            state.modal = !state.modal;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addList.pending, (state) => {
                state.state = 'loading';
            })
            .addCase(addList.fulfilled, (state) => {
                state.state = 'succeeded';
                state.error = null;
            })
            .addCase(addList.rejected, (state, action) => {
                state.state = 'failed';
                state.error = action.payload;
            })
            .addCase(getAll.pending, (state) => {
                state.state = 'loading';
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.state = 'succeeded';
                state.lists = action.payload.data.results;
                state.error = null;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.state = 'failed';
                state.error = action.payload;
            });
    },
})

export const { toggleModal } = listSlice.actions;

export default listSlice.reducer;