import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getAuth } from '../selectors';
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, ...rest }) => {
  const {isAuthenticated} = useSelector(getAuth)

   return (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    }
  />
);
  }

export default (PublicRoute);
