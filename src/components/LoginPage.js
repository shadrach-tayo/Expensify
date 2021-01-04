import React from "react";
import { connect } from "react-redux";
import { getAuth } from "../selectors";
import { useSelector, useDispatch } from "react-redux";
// import {
//   startGoogleLogin,
//   startTwitterLogin,
//   startGithubLogin
// } from '../actions/auth';

import { githubAuth, googleAuth, twitterAuth } from "../slices/auth";

export const LoginPage = () => {
  /**
   * selectors
   */
  const { loading } = useSelector(getAuth);
  /**
   * dispatcher
   */
  const dispatch = useDispatch();
  const _githubAuth = () => dispatch(githubAuth());
  const _twitterAuth = () => dispatch(twitterAuth());
  const _googleAuth = () => dispatch(googleAuth());

  console.log('loading ', loading)
  
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Expensify</h1>
        <h3>It's time to get your expenses under control</h3>
        <button className="btn btn__google" onClick={_googleAuth}>
          continue with Google
        </button>
        <button className="btn btn__twitter" onClick={_twitterAuth}>
          continue with Twitter
        </button>
        <button className="btn btn__github" onClick={_githubAuth}>
          continue with Github
        </button>
      </div>
    </div>
  );
};


export default LoginPage;
