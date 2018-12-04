import React from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import {
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    focused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = focused => {
    this.setState({ focused });
  };

  onTextChange = e => this.props.setTextFilter(e.target.value);

  onSortByChange = e => {
    if (e.target.value === 'date') this.props.sortByDate();
    else this.props.sortByAmount();
  };

  render() {
    return (
      <div className="container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              defaultValue={this.props.filters.text}
              onChange={this.onTextChange}
              placeholder="Search for Expenses"
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortByChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
