import selectExpenses from '../../selectors/expenses';
import moment from 'moment';

const expenses = [
  {
    id: '123',
    description: 'water bill',
    note: '',
    amount: 9000,
    createdAt: 0
  },
  {
    id: '345',
    description: 'Gas bill',
    note: '',
    amount: 500,
    createdAt: -1000
  },
  {
    id: '567',
    description: 'Rent',
    note: '',
    amount: 1800,
    createdAt: 1000
  }
];

// test for filter by text
test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

// test for filter by startDate
test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

// test for filter by endDate
test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

// test to sort by amount
test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  expect(selectExpenses(expenses, filters)).toEqual([
    expenses[0],
    expenses[2],
    expenses[1]
  ]);
});
