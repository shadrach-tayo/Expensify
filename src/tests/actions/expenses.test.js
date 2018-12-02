import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = '1234asdf';
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
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
  const store = createMockStore(defaultAuthState);
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
      .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});

test('should add expense with defaults to database and store', done => {
  const store = createMockStore(defaultAuthState);
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
      .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
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
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should startRemoveExpense with provided id from firebase', done => {
  const store = createMockStore(defaultAuthState);
  const { id } = expenses[2];
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const action = store.getActions()[0];
      expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('should startEditExpense and remove data from firebase', () => {
  const store = createMockStore(defaultAuthState);
  database
    .ref(`users/${uid}/expenses`)
    .once('value')
    .then(snapshot => {
      const expenses = [];
      snapshot.forEach(childSnapshot => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      const { id } = expenses[2];
      const updates = { ...expenses[2], description: 'updated description' };
      store
        .dispatch(startEditExpense(id, updates))
        .then(() => {
          const action = store.getActions()[0];
          expect(action).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
          });
          return database.ref(`users/${uid}/expenses/${id}`).once('value');
        })
        .then(snapshot => {
          expect(snapshot.val()).toEqual(updates);
        });
    });
});
