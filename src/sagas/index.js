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
import { addExpense, addExpenseSuccess } from "../slices/expenses";

function* googleLogin() {
  try {
    let data = yield firebase.auth().signInWithPopup(googleAuthProvider);    
    const userData = data.user.providerData[0]    

    yield put(loginSuccess({...userData, uid: data.user.uid}));
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

function* createExpense({payload}) {
  try {
    const { uid } = yield select(getAuth);
    
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = payload;
    const expense = { description, amount, note, createdAt };

    const ref = yield database.ref(`users/${uid}/expenses`).push(expense);

    yield put(addExpenseSuccess({ id: ref.key, ...expense }));
  } catch (e) {
    console.log("add Expense error ", e);
    yield put(addExpenseError(e.message));
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
  ]);
}

export default rootSaga;
