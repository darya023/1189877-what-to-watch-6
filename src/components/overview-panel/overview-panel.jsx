import React from "react";
import PropTypes from 'prop-types';
import {humanizeRating} from "../../utils/humanize-rating";

const OverwiewPanel = ({
  description,
  director,
  starring,
  rating,
  reviewsCount,
}) => {
  const humanizedRating = humanizeRating(rating);

  return <React.Fragment>
    <div className="movie-rating">
      <div className="movie-rating__score">{rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{humanizedRating}</span>
        <span className="movie-rating__count">{reviewsCount} ratings</span>
      </p>
    </div>
    <div className="movie-card__text">
      <p>
        {description}
      </p>
      <p className="movie-card__director"><strong>Director: {director}</strong></p>
      <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
    </div>
  </ React.Fragment>;
};

OverwiewPanel.propTypes = {
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
  reviewsCount: PropTypes.number.isRequired,
};

export default OverwiewPanel;
