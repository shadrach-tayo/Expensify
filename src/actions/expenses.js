import database from '../firebase/firebase';

// addExpense
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, amount, note, createdAt };
    return database
      .ref('expenses')
      .push(expense)
      .then(ref => {
        dispatch(addExpense({ id: ref.key, ...expense }));
      });
  };
};

// removeExpense
export const removeExpense = ({ id = '' } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// startRemoveExpense
export const startRemoveExpense = ({ id = '' } = {}) => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

// editExpense
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// startEditExpense
export const startEditExpense = (id, updates) => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .update(updates)
      .then(() => dispatch(editExpense(id, updates)));
  };
};

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref('expenses')
      .once('value')
      .then(snapshots => {
        const expenses = [];
        snapshots.forEach(snapshot => {
          expenses.push({ id: snapshot.key, ...snapshot.val() });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
