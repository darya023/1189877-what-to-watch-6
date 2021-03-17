import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs";
import {reviewsProp} from "../reviews-panel/reviews.prop";
import CatalogSimilar from "../catalog-similar/catalog-similar";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {getCurrentFilm} from "../../store/data/selectors";
import {useDispatch, useSelector} from "react-redux";
import Poster from "../poster/poster";
import FilmInfo from "../film-info/film-info";
import FilmHeader from "../film-header/film-header";
import Footer from "../footer/footer";
import {changeCurrentFilmID} from "../../store/action-creator";
import NotFoundScreen from "../not-found-screen/not-found-screen";

const FilmScreen = ({reviews, currentFilmID}) => {
  const currentFilm = useSelector((state) => getCurrentFilm(state));
  const authorizationStatus = useSelector((state) => getAuthorizationStatus(state));

  const dispatch = useDispatch();

  const onChangeCurrentFilmID = (id) => {
    dispatch(changeCurrentFilmID(id));
  };

  useEffect(()=> {
    onChangeCurrentFilmID(currentFilmID);
  }, [currentFilmID]);

  return currentFilm
    ? <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <FilmHeader title={currentFilm.title} backgroundImage={currentFilm.backgroundImage} />
          <div className="movie-card__wrap">
            <FilmInfo
              id={currentFilm.id}
              title={currentFilm.title}
              genre={currentFilm.genre}
              year={currentFilm.year}
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
    </React.Fragment>
    : <NotFoundScreen />;
};

FilmScreen.propTypes = {
  currentFilmID: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewsProp)
  ).isRequired,
};

export {FilmScreen};
export default FilmScreen;
