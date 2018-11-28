import expenseReducer from '../../reducers/expenses';

// test case for default state
test('should return default state', () => {
  const state = expenseReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

const expense = {
  id: '123',
  description: 'new expense',
  note: ''
};

// test case for add expense
test('should add expense', () => {
  const state = expenseReducer(undefined, { type: 'ADD_EXPENSE', expense });
  expect(state).toEqual([
    {
      id: '123',
      description: 'new expense',
      note: ''
    }
  ]);
});

const defaultState = [expense];
// test case for edit expense
test('should edit expense', () => {
  const state = expenseReducer(defaultState, {
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: { description: 'edited expense' }
  });
  expect(state).toEqual([
    {
      id: '123',
      description: 'edited expense',
      note: ''
    }
  ]);
});

const expenseListState = [
  {
    id: '123',
    description: 'new expense',
    note: ''
  },
  {
    id: '1234',
    description: 'new expense2',
    note: ''
  },
  {
    id: '1235',
    description: 'new expense3',
    note: ''
  }
];
// test case for remove expense action
test('should remove expense', () => {
  const state = expenseReducer(expenseListState, {
    type: 'REMOVE_EXPENSE',
    id: '123'
  });
  expect(state).toEqual([
    {
      id: '1234',
      description: 'new expense2',
      note: ''
    },
    {
      id: '1235',
      description: 'new expense3',
      note: ''
    }
  ]);
});

// test not to remove expense if id not founc
test('should not remove expense if id is not found', () => {
  const state = expenseReducer(expenseListState, {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  });
  expect(state).toEqual(expenseListState);
});
