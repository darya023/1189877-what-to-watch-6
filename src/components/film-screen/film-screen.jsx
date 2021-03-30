import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs";
import CatalogSimilar from "../catalog-similar/catalog-similar";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {useDispatch, useSelector} from "react-redux";
import Poster from "../poster/poster";
import FilmInfo from "../film-info/film-info";
import FilmHeader from "../film-header/film-header";
import Footer from "../footer/footer";
import {changeCurrentFilmID} from "../../store/action-creator";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import Spinner from "../spinner/spinner";
import {fetchFilm, fetchReviews} from "../../store/api-actions";
import {getCurrentFilmReviews, needShowSpinnerInsteadCurrentFilm} from "../../store/data/selectors/current-film";
import {getCurrentFilm} from "../../store/data/selectors/selectors";

const FilmScreen = ({currentFilmID}) => {
  const currentFilm = useSelector(getCurrentFilm);
  const reviews = useSelector(getCurrentFilmReviews);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isSpinnerShown = useSelector(needShowSpinnerInsteadCurrentFilm);

  const dispatch = useDispatch();

  const onChangeCurrentFilmID = (id) => {
    dispatch(changeCurrentFilmID(id));
  };

  const onLoadReviews = (id) => {
    dispatch(fetchReviews(id));
  };

  const [wasRewiewsRequested, setWasRewiewsRequested] = useState(false);

  useEffect(() => {
    if (currentFilm && !wasRewiewsRequested && currentFilmID) {
      onLoadReviews(currentFilm.id);
      setWasRewiewsRequested(true);

      return;
    }

    setWasRewiewsRequested(false);
  }, [currentFilm]);

  useEffect(()=> {
    onChangeCurrentFilmID(currentFilmID);
    dispatch(fetchFilm(currentFilmID));
  }, [currentFilmID]);

  if (isSpinnerShown) {
    return <Spinner />;
  }
  if (!currentFilm) {
    return <NotFoundScreen />;
  }
  return <React.Fragment>
    <section className="movie-card movie-card--full" style={{backgroundColor: `${currentFilm.backgroundColor}`}}>
      <div className="movie-card__hero">
        <FilmHeader title={currentFilm.title} backgroundImage={currentFilm.backgroundImage} />
        <div className="movie-card__wrap">
          <FilmInfo
            id={currentFilm.id}
            title={currentFilm.title}
            genre={currentFilm.genre}
            year={currentFilm.year}
            isFavorite={currentFilm.isFavorite}
            hasAddReviewButton={authorizationStatus}
          />
        </div>
      </div>
      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <Poster src={currentFilm.poster} alt={currentFilm.title} />
          <div className="movie-card__desc">
            <Tabs
              genre={currentFilm.genre}
              year={currentFilm.year}
              description={currentFilm.description}
              director={currentFilm.director}
              starring={currentFilm.starring}
              duration={currentFilm.duration}
              rating={currentFilm.rating}
              reviewsCount={currentFilm.reviewsCount}
              reviews={reviews}
            />
          </div>
        </div>
      </div>
    </section>
    <div className="page-content">
      <CatalogSimilar currentFilm={currentFilm} />
      <Footer />
    </div>
  </React.Fragment>;
};

FilmScreen.propTypes = {
  currentFilmID: PropTypes.string.isRequired,
};

export {FilmScreen};
export default FilmScreen;
