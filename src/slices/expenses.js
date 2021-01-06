import { createSlice } from "@reduxjs/toolkit";

export const initialState = { expenses: [], loading: false };

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state) => {
      state.loading = true;
    },

    addExpenseSuccess: (state, { payload }) => {
      return { ...state, loading: false, expenses: [...state.expenses, payload] };
    },

    addExpenseError: (state) => {
      state.loading = false;
    },
    removeExpense: (state, { payload }) => {
      return state.expenses.filter(({ id }) => id !== payload.id);
    },

    editExpense: (state, { payload }) => {
      return state.expenses.map((expense) => {
        if (expense.id === payload.id) {
          return {
            ...expense,
            ...payload.updates,
          };
        }
        return expense;
      });
    },

    setExpense: (_, { payload }) => {
      return payload;
    },
  },
});

export const {
  addExpense,
  removeExpense,
  setExpense,
  editExpense,
  addExpenseSuccess,
} = expenseSlice.actions;

export default expenseSlice.reducer;
