import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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

// startAddExpense with provided values
test('should startAddExpense with provided values', () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  });
});

test('should add expense to database and store', async done => {
  const store = createMockStore({});
  const expenseData = {
    description: 'new expense3',
    note: '',
    amount: 500,
    createdAt: 333
  };
  await store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});

test('should add expense with defaults to database and store', done => {
  const store = createMockStore({});
  const expenseDefault = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefault
      }
    });

    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
      });
  });
});

// // startAddExpense with default values
// test('should startAddExpense with default values', () => {
//   const action = startAddExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
