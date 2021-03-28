import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({text, children}) => {
  return (
    <div className="toast">
      <div className="toast__item">
        {text}
        {children}
      </div>
    </div>
  );
};

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Toast;
