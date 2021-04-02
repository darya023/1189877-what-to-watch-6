import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({text, className}) => {
  return (
    <div className={`${!className ? `toast` : ``}`}>
      <div className={`${className || `toast__item`}`}>
        {text}
      </div>
    </div>
  );
};

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Toast;
