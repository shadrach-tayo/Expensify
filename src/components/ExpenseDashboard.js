import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../selectors";
import { setExpense } from "../slices/expenses";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";

const ExpenseDashboardPage = () => {
  const dispatch = useDispatch();
  const _loadExpenses = () => dispatch(setExpense());

  const {expenses, loading } = useSelector(getExpenses);

  useEffect(() => {
    _loadExpenses();
    return () => {};
  }, [expenses.length]);

  console.log("loading expenses ", loading);

  return (
    <div>
      <ExpensesSummary />
      {/* <ExpenseListFilters /> */}
      <ExpenseList />
    </div>
  );
};

export default ExpenseDashboardPage;
