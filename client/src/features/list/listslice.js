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

export const userLists = createAsyncThunk(
  'list/getLists',
  async ({ account_id }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2000/api/lists/user/lists', { account_id });
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
      .addCase(addList.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(userLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload.listData;
        state.error = null;
      })
      .addCase(userLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { toggleModal } = listSlice.actions;
export default listSlice.reducer;
