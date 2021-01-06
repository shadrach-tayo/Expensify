import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  currentUser: {},
  isAuthenticated: false,
  error: "",
  loading: true,
  uid: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    
    googleAuth: (state) => {      
      console.log('loading auth ', state)
      state.loading = true;
    },

    githubAuth: (state) => {
      state.loading = true;
    },

    twitterAuth: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, { payload }) => {
      console.log("login success ", payload);
      state.currentUser = payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.uid = payload.uid;
    },

    loginError: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticated = false;
      state.loading = false;
    },

    logout: (state) => {
      state.loading = true;
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.currentUser = {};
      state.error = "";
      state.loading = false;
      state.uid = null;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
  twitterAuth,
  googleAuth,
  githubAuth,
} = authSlice.actions;

export default authSlice.reducer;
