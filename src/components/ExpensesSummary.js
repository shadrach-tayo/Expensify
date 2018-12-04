import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import expenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formatedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

  return (
    <div className="page-header">
      <div className="container">
        <h1 className="page-title">
          viewing <strong>{expenseCount}</strong> {expenseWord} totaling{' '}
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

const mapStateToProps = state => {
  const visibleExpenses = expenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
