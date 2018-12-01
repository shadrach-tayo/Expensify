import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { description, note, amount, createdAt };
  });
  database
    .ref('expenses')
    .set(expenseData)
    .then(() => done());
});

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

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', done => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});
