import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import expensesFilter from "../selectors/expenses";
import { getExpenses, getFilters } from "../selectors";
import selectExpensesTotal from "../selectors/expenses-total";
import numeral from "numeral";

export const ExpensesSummary = () => {
  const {expenses, loading} = useSelector(getExpenses);
  const expenseFilters = useSelector(getFilters);

  

  const visibleExpenses = expensesFilter(expenses, expenseFilters);
  const expenseCount = visibleExpenses.length; // get number of visible expense
  const expensesTotal = selectExpensesTotal(visibleExpenses);

  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const formatedExpensesTotal = numeral(expensesTotal / 100).format("$0,0.00");

  return (
    <div className="page-header">
      <div className="container">
        <h1 className="page-title">
          viewing <strong>{expenseCount}</strong> {expenseWord} totaling{" "}
          <strong>{formatedExpensesTotal}</strong>
        </h1>
        <div className="page-header__actions">
          <Link className="btn" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpensesSummary;
