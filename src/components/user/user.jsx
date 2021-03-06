import React from "react";
import PropTypes from 'prop-types';
import {userProps} from "../user/user.prop";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const User = ({user, authorizationStatus}) => {
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

User.propTypes = {
  user: PropTypes.shape(userProps).isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  user: state.user,
});

export {User};
export default connect(mapStateToProps, null)(User);
