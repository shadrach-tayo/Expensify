import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpense } from '../../components/EditExpense';

// setup spies
let editExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpense
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[0]}
    />
  );
});

test('should render EditExpense correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// handle edit expense using spies
test('should handle editExpense correctly', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

// handle remove expense using spies
test('should handle removeExpense correctly', () => {
  wrapper.find('button').simulate('click');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
  expect(history.push).toHaveBeenLastCalledWith('/');
});
