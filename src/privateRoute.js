import { withRouter, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

const AuthRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.token != null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
AuthRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps, {})(AuthRoute));
