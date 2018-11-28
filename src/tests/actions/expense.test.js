import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

// removeExpense
test('should remove expense', () => {
  const action = removeExpense({ id: '123' });
  expect(action).toEqual({ type: 'REMOVE_EXPENSE', id: '123' });
});

// editExpense
test('should edit expense', () => {
  const action = editExpense('234', { note: 'hello there' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '234',
    updates: { note: 'hello there' }
  });
});

// addExpense with provided values
test('should addExpense with provided values', () => {
  const expectedData = {
    description: 'water bill',
    note: 'pay water bills',
    amount: 5505,
    createdAt: 3235
  };
  const action = addExpense(expectedData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expectedData,
      id: expect.any(String)
    }
  });
});

// addExpense with default values
test('should addExpense with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
});
