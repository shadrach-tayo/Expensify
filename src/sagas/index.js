import { all, put, takeLatest, select } from "redux-saga/effects";
import {
  firebase,
  googleAuthProvider,
  twitterAuthProvider,
  githubAuthProvider,
} from "../firebase/firebase";

import {
  twitterAuth,
  googleAuth,
  githubAuth,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
} from "../slices/auth";

function* googleLogin() {  
  try {
    let data = yield firebase.auth().signInWithPopup(googleAuthProvider);
    console.log("user ", data.user);
    yield put(loginSuccess(data.user.providerData[0]));
  } catch (e) {
    console.log("login error ", e);
    put(loginError(e.message));
  }
}

function* githubLogin() {
  let user;
  try {
    user = yield firebase.auth().signInWithPopup(githubAuthProvider);
    yield put(loginSuccess(user));
  } catch (e) {
    console.log("login error ", e);
    put(loginError(e.message));
  }
}

function* twitterLogin() {
  let user;
  try {
    user = yield firebase.auth().signInWithPopup(twitterAuthProvider);
    yield put(loginSuccess(user));
  } catch (e) {
    console.log("login error ", e);
    put(loginError(e.message));
  }
}

function* logoutUser() {
  try {
    yield firebase.auth().signOut();
    yield put(logoutSuccess());
  } catch (e) {
    console.log("logout error ", e);
    put(logoutSuccess(e.message));
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* rootSaga() {
  yield all([
    takeLatest(twitterAuth.type, twitterLogin),
    takeLatest(googleAuth.type, googleLogin),
    takeLatest(githubAuth.type, githubLogin),
    takeLatest(logout.type, logoutUser),
  ]);
}

export default rootSaga;
