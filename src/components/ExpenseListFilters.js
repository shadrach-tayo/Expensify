import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import { useDispatch, useSelector } from "react-redux";

import { getFilters } from "../selectors";
import {
  setEndDate,
  setStartDate,
  setText,
  sortByAmount,
  sortByDate,
} from "../slices/filters";
import moment from 'moment'

function ExpenseListFilters(props) {
  // state
  const [focused, setFocused] = useState(null);

  // selectors
  let filtersState = useSelector(getFilters);
  const { text, startDate, endDate, sortBy } = filtersState;
  console.log("filters ", filtersState);

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
            startDate={startDate ? moment(startDate) : null}
            endDate={endDate ? moment(endDate) : null}
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

export default ExpenseListFilters;
