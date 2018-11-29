import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render ExpensesSummary with one expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={100000} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multilple expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={23} expensesTotal={5992380053} />
  );
  expect(wrapper).toMatchSnapshot();
});
