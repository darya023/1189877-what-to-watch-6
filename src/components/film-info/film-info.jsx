import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const FilmInfo = ({
  id,
  title,
  genre,
  year,
  hasAddReviewButton
}) => {

  return <div className="movie-card__desc">
    <h2 className="movie-card__title">{title}</h2>
    <p className="movie-card__meta">
      <span className="movie-card__genre">{genre}</span>
      <span className="movie-card__year">{year}</span>
    </p>
    <div className="movie-card__buttons">
      <Link to={`/player/${id}`}className="btn btn--play movie-card__button" type="button">
        <svg viewBox="0 0 19 19" width={19} height={19}>
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </Link>
      <button className="btn btn--list movie-card__button" type="button">
        <svg viewBox="0 0 19 20" width={19} height={20}>
          <use xlinkHref="#add" />
        </svg>
        <span>My list</span>
      </button>
      {
        hasAddReviewButton
          ? <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>
          : ``
      }
    </div>
  </div>;
};

FilmInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  hasAddReviewButton: PropTypes.bool.isRequired
};

export {FilmInfo};
export default FilmInfo;
