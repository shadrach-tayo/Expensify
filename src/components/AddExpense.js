import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpense extends React.Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h3 className="page-title">Add Expense</h3>
          </div>
        </div>
        <div className="container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddExpense);
