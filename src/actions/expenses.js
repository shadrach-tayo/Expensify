import database from '../firebase/firebase';

// addExpense
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, amount, note, createdAt };
    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then(ref => {
        dispatch(addExpense({ id: ref.key, ...expense }));
      })
      .catch(err => {
        debugger;
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
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return database
      .ref(`users/${uid}/expenses/${id}`)
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
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => dispatch(editExpense(id, updates)));
  };
};

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return database
      .ref(`users/${uid}/expenses`)
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
