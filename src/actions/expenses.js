import uuid from 'uuid';
import moment from 'moment';

// addExpense
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// removeExpense
export const removeExpense = ({ id = '' } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// editExpense
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
