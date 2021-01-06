import {combineReducers} from 'redux'

import authReducer from './auth'
import expensesReducer from './expenses'
import filtersReducer from "./filters";

const rootReducer = combineReducers({
  authState: authReducer,
  expenseState: expensesReducer,
  filtersState: filtersReducer,
});

export default rootReducer;