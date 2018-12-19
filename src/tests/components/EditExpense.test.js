import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpense } from '../../components/EditExpense';

// setup spies
let startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpense
      startEditExpense={startEditExpense}
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
  expect(startEditExpense).toHaveBeenLastCalledWith(
    expenses[0].id,
    expenses[0]
  );
  expect(history.push).toHaveBeenLastCalledWith('/');
});

// confirm remove expense
test('should confirm removeExpense correctly', () => {
  wrapper.find('.confirm-delete').simulate('click');
  expect(wrapper.state('showModal')).toBe(true);
});

// handle remove expense
test('should handle removeExpense correctly', () => {
  wrapper.find('.delete').simulate('click');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
  expect(history.push).toHaveBeenLastCalledWith('/');
});
