import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

// setup spies
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      filters={filters}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(toJSON(wrapper)).toMatchSnapshot();
});

// should handle text change
test('should handle text change', () => {
  const value = 'new text';
  wrapper.find('input').prop('onChange')({ target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  const value = 'date';
  wrapper.find('select').prop('onChange')({ target: { value } });
  expect(sortByDate).toHaveBeenCalled();
});

// should sort by amount
test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').prop('onChange')({ target: { value } });
  expect(sortByAmount).toHaveBeenCalled();
});

// should handle date changes
test('should sort by amount', () => {
  const startDate = moment(0);
  const endDate = moment(0);
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// should handle date focus changes
test('should handle date focus changes', () => {
  const focused = 'startDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(focused);
  expect(wrapper.state('focused')).toBe(focused);
});
