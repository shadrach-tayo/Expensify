import React from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      focused: false,
      error: ''
    };
  }

  onDescriptionchange = e => {
    this.setState({ description: e.target.value });
  };

  onNoteChange = e => {
    this.setState({ note: e.target.value });
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ amount: e.target.value });
    }
  };

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({
        createdAt
      }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({
      focused
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { description, amount, note, createdAt } = this.state;
    if (!description || !amount) {
      this.setState({ error: 'please fill in the description and the amount' });
    } else {
      this.setState({ error: '' });
      this.props.onSubmit({
        amount: parseInt(amount, 10) * 100,
        createdAt: createdAt.valueOf(),
        description,
        note
      });
    }
  };

  render() {
    return (
      <div className="container">
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error ? (
            <p className="form__error">{this.state.error}</p>
          ) : (
            ''
          )}
          <div className="input-group">
            <div className="input-group__item">
              <input
                type="text"
                className="text-input"
                placeholder="description"
                autoFocus
                value={this.state.description}
                onChange={this.onDescriptionchange}
              />
            </div>
            <div className="input-group__item">
              <SingleDatePicker
                date={this.state.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.focused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
            </div>
            <div className="input-group__item">
              <textarea
                className="textarea"
                placeholder="Add expense note (optional)"
                value={this.state.note}
                onChange={this.onNoteChange}
              />
            </div>
            <div className="input-group__item">
              <input
                type="number"
                className="text-input"
                value={this.state.amount}
                placeholder="amount"
                onChange={this.onAmountChange}
              />
            </div>
            <div className="input-group__item">
              <button className="btn">Save Expense</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
