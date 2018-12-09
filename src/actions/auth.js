import {
  firebase,
  googleAuthProvider,
  twitterAuthProvider
} from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const startGoogleLogin = () => {
  return dispatch => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startTwitterLogin = () => {
  return dispatch => {
    return firebase.auth().signInWithPopup(twitterAuthProvider);
  };
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
