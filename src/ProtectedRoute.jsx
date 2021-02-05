import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { checkToken } from "./redux/actions/auth";

const ProtectedRoute = ({
  component: Component,
  checkToken,
  isAuthenticated,
  ...rest
}) => {
  useEffect(() => {
    const check = async () => {
      await checkToken()
    };
    check();
  }, [checkToken]);
  return (<Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
    }
  />)

};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToprops, { checkToken })(ProtectedRoute);
