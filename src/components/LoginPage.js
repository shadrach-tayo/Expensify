import React from 'react';
import { connect } from 'react-redux';
import {
  startGoogleLogin,
  startTwitterLogin,
  startGithubLogin
} from '../actions/auth';

export const LoginPage = ({
  startGoogleLogin,
  startTwitterLogin,
  startGithubLogin
}) => {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Expensify</h1>
        <h3>It's time to get your expenses under control</h3>
        <button className="btn btn__google" onClick={startGoogleLogin}>
          continue with Google
        </button>
        <button className="btn btn__twitter" onClick={startTwitterLogin}>
          continue with Twitter
        </button>
        <button className="btn btn__github" onClick={startGithubLogin}>
          continue with Github
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startTwitterLogin: () => dispatch(startTwitterLogin()),
  startGithubLogin: () => dispatch(startGithubLogin())
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
