import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getReport} from './reportService'

const initialState = {
  template: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getTemplate = createAsyncThunk(
  "template/getreport",
  async (month, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await getReport(month,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    reset: (state) => {

      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    resetAll: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTemplate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.template = action.payload;
    });
    builder.addCase(getTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.expenses = null;
    });
  },
});

export const { reset, resetAll } = reportSlice.actions;

export default reportSlice.reducer;
