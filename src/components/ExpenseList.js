import React from "react";
import { useSelector } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpense from "../selectors/expenses";
import { getExpenses, getFilters } from "../selectors";

export const ExpenseList = (props) => {
  const { expenses } = useSelector(getExpenses);
  const filters = useSelector(getFilters);

  const visibleExpenses = selectExpense(expenses, filters);
  console.log("visible ", visibleExpenses);

  return (
    <div className="container">
      <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      <div className="list-body">
        {visibleExpenses.length === 0 ? (
          <div className="list-item list-item__message">
            <span className="">No expenses</span>
          </div>
        ) : (
          visibleExpenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />;
          })
        )}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     expenses: selectExpense(state.expenses, state.filters),
//   };
// };

export default ExpenseList;
