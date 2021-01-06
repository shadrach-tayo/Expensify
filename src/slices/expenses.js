import { createSlice } from "@reduxjs/toolkit";

export const initialState = { expenses: [], loading: false };

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state) => {
      state.loading = true;
    },

    setExpense: (state) => ({...state, loading: true}),    

    addExpenseSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        expenses: [...state.expenses, payload],
      };
    },

    addExpenseError: (state) => {
      state.loading = false;
    },

    setExpensesSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        expenses: payload,
      };
    },

    removeExpense: (state, { payload }) => {
      return {...state, loading: true}
    },

    removeExpenseSuccess: (state, { payload }) => {
      return {...state, expenses: state.expenses.filter(({ id }) => id !== payload.id)}
    },

    editExpense: (state) => {      
      return {...state, loading: true};
    },
    
    editExpenseSuccess: (state, { payload }) => {      

      const expenses = state.expenses.map((expense) => {
        if (expense.id === payload.id) {
          return {
            ...expense,
            ...payload.updates,
          };
        }
        return expense
      });

      return {...state, expenses};
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
  removeExpenseSuccess,
  editExpenseSuccess,
  setExpensesSuccess
} = expenseSlice.actions;

export default expenseSlice.reducer;
