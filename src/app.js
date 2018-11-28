import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { sortByAmount } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// css for react-dates
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(
  addExpense({
    description: 'water bill',
    amount: 9000,
    createdAt: new Date().getTime()
  })
);

store.dispatch(
  addExpense({
    description: 'Gas bill',
    amount: 500,
    createdAt: new Date().getTime()
  })
);

store.dispatch(
  addExpense({
    description: 'Rent',
    amount: 1800,
    createdAt: new Date().getTime()
  })
);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));
