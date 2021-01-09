import { compose } from "redux";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import rootReducer from "../slices";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export function that creates store and returns it
// export default () => {
//   const store = createStore(
//     combineReducers({
//       expenses: expensesReducer,
//       filters: filtersReducer,
//       auth: authReducer
//     }),
//     composeEnhancers(applyMiddleware(thunk))
//   );
//   return store;
// };
export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })],
    devTools: process.env.NODE_ENV !== "production",
  });
  sagaMiddleware.run(rootSaga);

  return store;
};
