import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import { useDispatch, useSelector } from "react-redux";
// import { setTextFilter } from "../actions/filters";
// import {
//   sortByAmount,
//   sortByDate,
//   setStartDate,
//   setEndDate,
// } from "../actions/filters";
import { getFilters } from "../selectors";
import {
  setEndDate,
  setStartDate,
  setText,
  sortByAmount,
  sortByDate,
} from "../slices/filters";

function ExpenseListFilters(props) {
  // state
  const [focused, setFocused] = useState(null);

  // selectors
  const { text, startDate, endDate, sortBy } = useSelector(getFilters);

  // dispatcher
  const dispatch = useDispatch();
  const _sortByAmount = () => dispatch(sortByAmount());
  const _setTextFilter = (value) => dispatch(setText(value));
  const _sortByDate = () => dispatch(sortByDate());
  const _setStartDate = (date) => dispatch(setStartDate(date));
  const _setEndDate = (date) => dispatch(setEndDate(date));


  const onDatesChange = ({ startDate, endDate }) => {
    _setStartDate(startDate);
    _setEndDate(endDate);
  };

  const onFocusChange = (focused) => {
    setFocused(focused);
  };

  const onTextChange = (e) => _setTextFilter(e.target.value);

  const onSortByChange = (e) => {
    if (e.target.value === "date") _sortByDate();
    else _sortByAmount();
  };

  return (
    <div className="container">
      <div className="input-group">
        <div className="input-group__item">
          <input
            type="text"
            className="text-input"
            defaultValue={text}
            onChange={onTextChange}
            placeholder="Search for Expenses"
          />
        </div>
        <div className="input-group__item">
          <select className="select" value={sortBy} onChange={onSortByChange}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div className="input-group__item">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDatesChange={onDatesChange}
            focusedInput={focused}
            onFocusChange={onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     filters: state.filters,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   setTextFilter: (text) => dispatch(setTextFilter(text)),
//   sortByDate: () => dispatch(sortByDate()),
//   sortByAmount: () => dispatch(sortByAmount()),
//   setStartDate: (startDate) => dispatch(setStartDate(startDate)),
//   setEndDate: (endDate) => dispatch(setEndDate(endDate)),
// });

export default ExpenseListFilters;
