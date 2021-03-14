import React from "react";
import PropTypes from 'prop-types';

const DetailsPanelItem = ({
  name,
  value,
  children
}) => {
  return <p className="movie-card__details-item">
    <strong className="movie-card__details-name">{name}</strong>
    <span className="movie-card__details-value">{value || children}</span>
  </p>;
};

DetailsPanelItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node
};

export default DetailsPanelItem;
