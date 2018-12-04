import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = () => {
    let id = this.props.expense.id;
    this.props.startRemoveExpense({ id });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Edit Expense</h1>
          </div>
        </div>
        <div className="container">
          <ExpenseForm onSubmit={this.onSubmit} expense={this.props.expense} />
          <div className="container">
            <div className="input-group">
              <button className="btn btn--sec" onClick={this.onRemove}>
                Delete item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpense);
