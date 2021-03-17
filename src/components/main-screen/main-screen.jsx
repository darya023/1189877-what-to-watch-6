import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {filmProps} from "../film-screen/film-screen.prop";
import Spinner from "../spinner/spinner";
import CatalogMain from "../catalog-main/catalog-main";
import {getLoadedPosterStatus, getPoster} from "../../store/data/selectors";
import {useDispatch, useSelector} from "react-redux";
import Poster from "../poster/poster";
import FilmInfo from "../film-info/film-info";
import FilmHeader from "../film-header/film-header";
import Footer from "../footer/footer";
import {changeCurrentFilmID} from "../../store/action-creator";

const MainScreen = () => {
  const poster = useSelector((state) => getPoster(state));
  const isPosterLoaded = useSelector((state) => getLoadedPosterStatus(state));
  const currentFilmID = poster ? poster.id : null;

  const dispatch = useDispatch();

  const onChangeCurrentFilmID = (id) => {
    dispatch(changeCurrentFilmID(id));
  };

  useEffect(() => {
    onChangeCurrentFilmID(currentFilmID);
  }, [currentFilmID]);

  return <React.Fragment>
    <section className="movie-card">
      {
        !isPosterLoaded
          ? <Spinner />
          : <>
            <FilmHeader title={poster.title} backgroundImage={poster.backgroundImage} />
            <div className="movie-card__wrap">
              <div id="info" className="movie-card__info">
                <Poster src={poster.poster} alt={poster.title} />
                <FilmInfo
                  id={poster.id}
                  title={poster.title}
                  genre={poster.genre}
                  year={poster.year}
                  hasAddReviewButton={false}
                />
              </div>
            </div>
          </>
      }
    </section>
    <div className="page-content">
      <CatalogMain />
      <Footer />
    </div>
  </React.Fragment>;
};

MainScreen.propTypes = {
  poster: PropTypes.shape(filmProps),
};

export {MainScreen};
export default MainScreen;
