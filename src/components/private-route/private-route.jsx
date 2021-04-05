import React from "react";
import PropTypes from 'prop-types';
import {Route, Redirect} from "react-router-dom";
import {getAuthorizationStatus, needShowSpinnerInsteadPrivatePage} from "../../store/user/selectors";
import {useSelector} from "react-redux";
import {AppRoute} from "../../const";
import Spinner from "../spinner/spinner";

const PrivateRoute = ({component: Component, ...rest}) => {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isSpinnerShown = useSelector(needShowSpinnerInsteadPrivatePage);

  if (isSpinnerShown) {
    return <Spinner />;
  }

  return <Route
    {...rest}
    render={(props) => (
      authorizationStatus
        ? <Component {...props} />
        : <Redirect to={AppRoute.LOGIN} />
    )}
  />;
};


PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export {PrivateRoute};
export default PrivateRoute;
