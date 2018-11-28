import moment from 'moment';
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate
} from '../../actions/filters';

// test setStartDate
test('should generate set start date object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({ type: 'SET_START_DATE', startDate: moment(0) });
});

// test setEndDate
test('should generate set start date object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({ type: 'SET_END_DATE', endDate: moment(0) });
});

// test setTextFilter
test('should set text filter', () => {
  expect(setTextFilter()).toEqual({ type: 'SET_TEXT', text: '' });
});

// test sortByAmount
test('should set sortBy to amount', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT', sortBy: 'amount' });
});

// test sortByDate
test('should set sortBy to date', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE', sortBy: 'date' });
});
