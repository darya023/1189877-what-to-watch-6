import React from "react";
import PropTypes from 'prop-types';
import {Link, useHistory} from "react-router-dom";
import {toggleIsFavoriteKey} from "../../store/api-actions";
import {useDispatch, useSelector} from "react-redux";
import {getSendingDataStatus} from "../../store/data/selectors";

const FilmInfo = ({
  id,
  title,
  genre,
  year,
  isFavorite,
  hasAddReviewButton,
}) => {
  const isSendingData = useSelector(getSendingDataStatus);

  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    dispatch(toggleIsFavoriteKey({id, isFavorite}));
  };

  const path = useHistory().location.pathname;

  return <div className="movie-card__desc">
    <h2 className="movie-card__title">{title}</h2>
    <p className="movie-card__meta">
      <span className="movie-card__genre">{genre}</span>
      <span className="movie-card__year">{year}</span>
    </p>
    <div className="movie-card__buttons">
      <Link to={{pathname: `/player/${id}`, state: {prevPath: path}}} className="btn btn--play movie-card__button" type="button">
        <svg viewBox="0 0 19 19" width={19} height={19}>
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </Link>
      <button
        onClick={handleAddButtonClick}
        disabled={isSendingData}
        className="btn btn--list movie-card__button"
        type="button"
        title={isFavorite ? `Remove from My list` : ``}
      >
        <svg viewBox="0 0 19 20" width={19} height={20}>
          {
            isFavorite
              ? <use xlinkHref="#added" />
              : <use xlinkHref="#add" />
          }
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
  isFavorite: PropTypes.bool.isRequired,
  hasAddReviewButton: PropTypes.bool.isRequired
};

export {FilmInfo};
export default FilmInfo;
