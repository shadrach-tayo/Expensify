import React from 'react';
import { connect } from 'react-redux';
import ExpenseFrom from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
  onSubmit = expense => {
    this.props.editExpense(this.props.expense.id, expense);
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
        <ExpenseFrom onSubmit={this.onSubmit} expense={this.props.expense} />
        <button onClick={this.onRemove}>remove item</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpense);
