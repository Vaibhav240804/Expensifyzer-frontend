import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "./ExpenseService";
const initialState = {
  expenses: [],
  weeklyExp: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isweeklyloading:false,
  isweeklyError:false,
  isweeklysucces:false,
  message: "",
};

export const createExpense = createAsyncThunk(
  "expenses/create",
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.createExpense(expenseData, token);
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

export const updateExp = createAsyncThunk(
  "expenses/update",
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.updateExpense(expenseData, token);
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

export const getExpenses = createAsyncThunk(
  "expenses/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.getExpenses(token);
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

export const deleteExp = createAsyncThunk(
  "expenses/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.deleteExpense(id,token);
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

export const expeseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    wipeWeekly:(state)=>{
      state.weeklyExp = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createExpense.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createExpense.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.expenses.push(action.payload);
    });
    builder.addCase(createExpense.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getExpenses.pending, (state, action) => {
      state.isweeklyloading = true;
    });
    builder.addCase(getExpenses.fulfilled, (state, action) => {
      state.isweeklyError = false;
      state.isweeklysucces = true;
      state.isweeklyloading = false;
      state.weeklyExp = action.payload;
    });
    builder.addCase(getExpenses.rejected, (state, action) => {
      state.isweeklyloading = false;
      state.isweeklyError = true;
      state.isweeklysucces = false;
      state.message = action.payload;
    });

    builder.addCase(updateExp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateExp.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      const upid = action.payload._id;
      const index = state.expenses.findIndex((exp) => exp._id === upid);
      state.expenses[index] = action.payload;
      if(!state.expenses){
        state.expenses = action.payload;
      }
      
    });
    builder.addCase(updateExp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });

    builder.addCase(deleteExp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteExp.fulfilled, (state, {payload}) => {
      state.isSuccess = true;
      state.isError = false;
      state.isLoading = false;
      const upid = payload.id;
      state.expenses = state.expenses.filter((exp) => exp._id !== upid);
    });
    builder.addCase(deleteExp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  },
});

export const { reset, wipeWeekly } = expeseSlice.actions;

export default expeseSlice.reducer;
