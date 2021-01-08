import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// Default States
const initialState = {
  text: "",
  sortBy: "",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month"),
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setText: (state, { payload }) => {
      return { ...state, text: payload };
    },

    sortByAmount: (state) => {
      return {
        ...state,
        sortBy: "amount",
      };
    },

    sortByDate: (state) => {
      return {
        ...state,
        sortBy: "date",
      };
    },

    setStartDate: (state, { payload }) => {
      return {
        ...state,
        startDate: payload,
      };
    },

    setEndDate: (state, { payload }) => {
      return {
        ...state,
        endDate: payload,
      };
    },
  },
});

export const {
  setText,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} = filtersSlice.actions;

export default filtersSlice.reducer;
