import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../actions/auth";
import { logout } from "../slices/auth";

export const Header = () => {
  /**
   * dispatchers
   */
  const dispatch = useDispatch();
  const _logout = () => dispatch(logout());

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>Expensify</h1>
          </Link>
          <button className="btn btn--link" onClick={_logout}>
            LOGOUT
          </button>
        </div>
      </div>
    </header>
  );
};
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default Header;
