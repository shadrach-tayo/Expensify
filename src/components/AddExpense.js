import React from "react";
import { useDispatch } from "react-redux";
import ExpenseForm from "./ExpenseForm";
// import { startAddExpense } from "../actions/expenses";
import { addExpense } from "../slices/expenses";

const AddExpense = (props) => {
  const dispatch = useDispatch();
  const _addExpense = (expense) => addExpense(expense);

  const onSubmit = (expense) => {
    // this.props.startAddExpense(expense);
    dispatch(_addExpense(expense));
    props.history.push("/");
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h3 className="page-title">Add Expense</h3>
        </div>
      </div>
      <div className="container">
        <ExpenseForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   startAddExpense: (expense) => dispatch(startAddExpense(expense)),
// });

export default AddExpense;
