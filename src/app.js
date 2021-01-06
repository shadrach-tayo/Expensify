import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import { firebase } from "./firebase/firebase";
// import { startSetExpenses } from "./actions/expenses";
import configureStore from "./store/configureStore";
// import { login, logout } from "./actions/auth";
import { Loader } from "./components/Loader";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { loginSuccess, logout } from "./slices/auth";

/**
 * TODO: refactor component to dispatch login using useEffect hook
 * pass the user.uid from as a dependency
 */

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<Loader />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(loginSuccess({ ...user.providerData[0], uid: user.uid }));
    renderApp();
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
