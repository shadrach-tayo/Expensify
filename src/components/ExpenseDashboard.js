import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../selectors";
import { setExpense } from "../slices/expenses";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";

const ExpenseDashboardPage = () => {
  const dispatch = useDispatch();
  const _loadExpenses = useCallback(() => dispatch(setExpense(), [dispatch]));

  const { expenses, loading } = useSelector(getExpenses);

  useEffect(() => {
    if(loading) return;
    _loadExpenses();
    return () => {};
  }, []);


  return (
    <div>
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  );
};

export default ExpenseDashboardPage;
