import selectExpensesTotal from '../../selectors/expenses-total';
import moment from 'moment';

const expenses = [
  {
    id: '1',
    description: 'new expense',
    note: '',
    amount: 5,
    createdAt: 0
  },
  {
    id: '2',
    description: 'new expense2',
    note: '',
    amount: 109952,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf()
  },
  {
    id: '3',
    description: 'new expense3',
    note: '',
    amount: 500,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf()
  }
];

test('should return 0 if no expenses', () => {
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
});

test('should correctly add up a single expense', () => {
  const expense = expenses[0];
  const result = selectExpensesTotal([expense]);
  expect(result).toBe(5);
});

test('should correctly add up a multiple expenses', () => {
  const result = selectExpensesTotal(expenses);
  expect(result).toBe(110457);
});
