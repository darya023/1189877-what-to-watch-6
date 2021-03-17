import React from "react";
import PropTypes from 'prop-types';
import User from "../user/user";
import Logo from "../logo/logo";

const Header = ({
  children,
  className,
  withoutUserComponent
}) => {
  return <header className={`page-header ${className}`}>
    <Logo />
    {children}
    {
      !withoutUserComponent
        ? <User/>
        : ``
    }
  </header>;
};

Header.propTypes = {
  className: PropTypes.string.isRequired,
  withoutUserComponent: PropTypes.bool,
  children: PropTypes.node
};

export {Header};
export default Header;
