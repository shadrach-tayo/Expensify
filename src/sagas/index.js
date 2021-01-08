import { all, put, takeLatest, select } from "redux-saga/effects";
import database, {
  firebase,
  googleAuthProvider,
  twitterAuthProvider,
  githubAuthProvider,
} from "../firebase/firebase";
import { getAuth } from "../selectors";

import {
  twitterAuth,
  googleAuth,
  githubAuth,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
} from "../slices/auth";
import {
  addExpense,
  editExpense,
  setExpense,
  removeExpense,
  addExpenseSuccess,
  removeExpenseSuccess,
  setExpensesSuccess,
  editExpenseSuccess
} from "../slices/expenses";

function* googleLogin() {
  try {
    let data = yield firebase.auth().signInWithPopup(googleAuthProvider);
    const userData = data.user.providerData[0];

    yield put(loginSuccess({ ...userData, uid: data.user.uid }));
  } catch (e) {
    console.log("login error ", e);
    yield put(loginError(e.message));
  }
}

function* githubLogin() {
  let user;
  try {
    user = yield firebase.auth().signInWithPopup(githubAuthProvider);
    yield put(loginSuccess(user));
  } catch (e) {
    console.log("login error ", e);
    yield put(loginError(e.message));
  }
}

function* twitterLogin() {
  let user;
  try {
    user = yield firebase.auth().signInWithPopup(twitterAuthProvider);
    yield put(loginSuccess(user));
  } catch (e) {
    console.log("login error ", e);
    yield put(loginError(e.message));
  }
}

function* logoutUser() {
  try {
    yield firebase.auth().signOut();
    yield put(logoutSuccess());
  } catch (e) {
    console.log("logout error ", e);
    yield put(logoutSuccess(e.message));
  }
}

function* createExpense({ payload }) {
  try {
    const { uid } = yield select(getAuth);

    const { description = "", note = "", amount = 0, createdAt = 0 } = payload;
    const expense = { description, amount, note, createdAt };

    const ref = yield database.ref(`users/${uid}/expenses`).push(expense);

    yield put(addExpenseSuccess({ id: ref.key, ...expense }));
  } catch (e) {
    console.log("add Expense error ", e);
    yield put(addExpenseError(e.message));
  }
}

function* setExpenses() {
  try {
    const { uid } = yield select(getAuth);

    const snapshots = yield database.ref(`users/${uid}/expenses`).once("value");

    const expenses = [];
    snapshots.forEach((snapshot) => {
      expenses.push({ id: snapshot.key, ...snapshot.val() });
    });
    
    yield put(setExpensesSuccess(expenses));
  } catch (e) {
    console.log("set Expense error ", e);
    // yield put(addExpenseError(e.message));
  }
}

function* deleteExpense({ payload }) {
  try {
    const { uid } = yield select(getAuth);

    const done = yield database
      .ref(`users/${uid}/expenses/${payload.id}`)
      .remove();

    console.log("remove expense ", done);
    yield put(removeExpenseSuccess(payload));
  } catch (e) {
    console.log("remove Expense error ", e);
    // yield put(addExpenseError(e.message));
  }
}

function* modifyExpense({ payload }) {
  try {
    const { uid } = yield select(getAuth);
        

    const done = yield database
      .ref(`users/${uid}/expenses/${payload.id}`)
      .update(payload.updates);

    yield put(editExpenseSuccess(payload.updates));
  } catch (e) {
    console.log("edit Expense error ", e);
    // yield put(addExpenseError(e.message));
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* rootSaga() {
  yield all([
    takeLatest(twitterAuth.type, twitterLogin),
    takeLatest(googleAuth.type, googleLogin),
    takeLatest(githubAuth.type, githubLogin),
    takeLatest(logout.type, logoutUser),
    takeLatest(addExpense.type, createExpense),
    takeLatest(setExpense.type, setExpenses),
    takeLatest(editExpense.type, modifyExpense),
    takeLatest(removeExpense.type, deleteExpense),
  ]);
}

export default rootSaga;
