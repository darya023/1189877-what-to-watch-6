import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({text, className}) => {
  return (
    <div className={!className ? `toast` : ``}>
      <p className={`${className || `toast__item`}`}>
        {text}
      </p>
    </div>
  );
};

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Toast;
