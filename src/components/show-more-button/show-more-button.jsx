import React from "react";
import PropTypes from 'prop-types';

const ShowMoreButton = ({onShowMoreButtonClick}) => {
  return <div className="catalog__more">
    <button onClick={onShowMoreButtonClick} className="catalog__button" type="button">Show more</button>
  </div>;
};

ShowMoreButton.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export {ShowMoreButton};
export default ShowMoreButton;
