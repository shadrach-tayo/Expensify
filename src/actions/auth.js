import {
  firebase,
  googleAuthProvider,
  twitterAuthProvider,
  githubAuthProvider
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

export const startGithubLogin = () => {
  return dispatch => {
    return firebase.auth().signInWithPopup(githubAuthProvider);
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
