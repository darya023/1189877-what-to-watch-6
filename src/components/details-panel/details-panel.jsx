import React from "react";
import PropTypes from 'prop-types';
import {humanizeDuration} from "../../utils/humanize-duration";

const DetailsPanel = ({
  genre,
  year,
  director,
  starring,
  duration,
}) => {
  const humanizedDuration = humanizeDuration(duration);

  return <div className="movie-card__text movie-card__row">
    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Director</strong>
        <span className="movie-card__details-value">{director}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Starring</strong>
        <span className="movie-card__details-value">
          {
            starring.map((actor)=>{
              return <React.Fragment key={actor}>
                {actor}<br />
              </ React.Fragment>;
            })
          }
        </span>
      </p>
    </div>
    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Run Time</strong>
        <span className="movie-card__details-value">{humanizedDuration}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Genre</strong>
        <span className="movie-card__details-value">{genre}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Released</strong>
        <span className="movie-card__details-value">{year}</span>
      </p>
    </div>
  </div>;
};

DetailsPanel.propTypes = {
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired,
};

export default DetailsPanel;
