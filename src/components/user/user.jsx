import React from "react";
import PropTypes from 'prop-types';
import {userProps} from "../user/user.prop";
import {Link} from "react-router-dom";

const User = ({user}) => {
  const {image} = user;
  return <div className="user-block">
    <div className="user-block__avatar">
      <Link to="/mylist">
        <img src={image} alt="User avatar" width={63} height={63} />
      </Link>
    </div>
    <Link to="/login" className="user-block__link">Sign in</Link>
  </div>;
};

User.propTypes = {
  user: PropTypes.shape(userProps)
};

export default User;
