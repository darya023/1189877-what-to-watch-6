import React from "react";
import {Link} from "react-router-dom";
import {getAuthorizationStatus, getUser} from "../../store/user/selectors";
import {useSelector} from "react-redux";

const User = () => {
  const authorizationStatus = useSelector((state) => getAuthorizationStatus(state));
  const user = useSelector((state) => getUser(state));

  return <div className="user-block">
    {authorizationStatus
      ? <>
        <div className="user-block__avatar">
          <Link to="/mylist">
            <img src={user.image} alt="User avatar" width={63} height={63} />
          </Link>
        </div>
        <div>{user.email}</div>
      </>
      : <Link to="/login" className="user-block__link">Sign in</Link>
    }
  </div>;
};

export {User};
export default User;
