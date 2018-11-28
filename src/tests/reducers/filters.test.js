import filterReducer from '../../reducers/filters';
import moment from 'moment';

// test default values
test('should setup default filter values', () => {
  const state = filterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

// test case for SET_TEXT action
test('should set filters text', () => {
  const state = filterReducer(undefined, { type: 'SET_TEXT', text: 'text' });
  expect(state).toEqual({
    text: 'text',
    sortBy: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

// test case for SORT_BY_AMOUNT action
test('should set filters text', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

// test case for SORT_BY_DATE action
test('should set filters text', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_DATE' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

// test case for SET_START_DATE action
test('should set filters text', () => {
  const state = filterReducer(undefined, {
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
  expect(state).toEqual({
    text: '',
    sortBy: '',
    startDate: moment(0),
    endDate: moment().endOf('month')
  });
});

// test case for SET_END_DATE action
test('should set filters text', () => {
  const state = filterReducer(undefined, {
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
  expect(state).toEqual({
    text: '',
    sortBy: '',
    startDate: moment().startOf('month'),
    endDate: moment(0)
  });
});
