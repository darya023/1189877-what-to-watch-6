import React from "react";
import PropTypes from 'prop-types';

const Poster = ({src, alt, className}) => {

  return <div className={`movie-card__poster ${className}`}>
    <img src={src} alt={alt} width={218} height={327} />
  </div>;
};

Poster.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export {Poster};
export default Poster;
