import React from "react";
import PropTypes from 'prop-types';
import {Route, Redirect} from "react-router-dom";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {useSelector} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return <Route
    {...rest}
    render={(props) => (
      authorizationStatus
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />;
};


PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export {PrivateRoute};
export default PrivateRoute;
