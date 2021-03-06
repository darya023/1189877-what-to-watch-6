import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({authorizationStatus, component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (
      authorizationStatus
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});
export {PrivateRoute};
export default connect(mapStateToProps, null)(PrivateRoute);
