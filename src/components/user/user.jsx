import React from "react";
import {Link} from "react-router-dom";
import {getAuthorizationStatus, getUser} from "../../store/user/selectors";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/api-actions";
import {AppRoute} from "../../const";

const User = () => {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return <div className="user-block">
    {authorizationStatus
      ? <>
        <div className="user-block__avatar">
          <Link to={AppRoute.MY_LIST}>
            <img src={user.image} alt="User avatar" width={63} height={63} />
          </Link>
        </div>
        <div>{user.email}</div>
        <button onClick={handleLogoutButtonClick} className="btn">Log out</button>
      </>
      : <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
    }
  </div>;
};

export {User};
export default User;
