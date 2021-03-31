import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ReviewForm from "../review-form/review-form";
import FilmHeader from "../film-header/film-header";
import PosterSmall from "../poster/poster-small";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentFilmID} from "../../store/action-creator";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import Spinner from "../spinner/spinner";
import {getCurrentFilmFromFilmsList, needShowSpinnerInsteadCurrentFilm} from "../../store/data/selectors/current-film";
import {AppRoute} from "../../const";

const AddReviewScreen = ({currentFilmID}) => {
  const currentFilm = useSelector(getCurrentFilmFromFilmsList);
  const isSpinnerShown = useSelector(needShowSpinnerInsteadCurrentFilm);

  const dispatch = useDispatch();

  const onChangeCurrentFilmID = (id) => {
    dispatch(changeCurrentFilmID(id));
  };

  useEffect(() => {
    onChangeCurrentFilmID(currentFilmID);
  }, [currentFilmID]);

  if (isSpinnerShown) {
    return <Spinner />;
  }
  if (!currentFilm) {
    return <NotFoundScreen />;
  }
  return <section className="movie-card movie-card--full" style={{backgroundColor: `${currentFilm.backgroundColor}`}}>
    <div className="movie-card__header">
      <FilmHeader title={currentFilm.title} backgroundImage={currentFilm.backgroundImage}>
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              {
              // eslint-disable-next-line
              <Link to={AppRoute.FILM(currentFilm.id)} className="breadcrumbs__link">{currentFilm.title}</ Link>
              }
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">Add review</a>
            </li>
          </ul>
        </nav>
      </FilmHeader>
      <PosterSmall src={currentFilm.poster} alt={currentFilm.title} />
    </div>
    <div className="add-review">
      <ReviewForm currentFilmID={currentFilm.id} />
    </div>
  </section>;
};

AddReviewScreen.propTypes = {
  currentFilmID: PropTypes.string.isRequired,
};

export default AddReviewScreen;
