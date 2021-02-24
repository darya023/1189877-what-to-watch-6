import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {userProps} from "../user/user.prop";
import {filmProps} from "../film-screen/film-screen.prop";
import User from "../user/user";
import Logo from "../logo/logo";
import Tabs from "../tabs/tabs";
import {reviewsProp} from "../reviews-panel/reviews.prop";
import CatalogSimilar from "../catalog/catalog-similar";

const FilmScreen = ({currentFilm, similarFilms, user, reviews}) => {
  const {
    id,
    title,
    poster,
    backgroundImage,
    genre,
    year,
    description,
    director,
    actors,
    starring,
    duration,
    rating,
    reviewsCount,
  } = currentFilm;

  return <React.Fragment>
    <div className="visually-hidden">
      {/* inject:svg */}<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><symbol id="add" viewBox="0 0 19 20">
        {/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
        <title>+</title>
        <desc>Created with Sketch.</desc>
        <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859" />
        </g>
      </symbol><symbol id="full-screen" viewBox="0 0 27 27">
        <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
        <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
        <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
      </symbol><symbol id="in-list" viewBox="0 0 18 14">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5" />
      </symbol><symbol id="pause" viewBox="0 0 14 21">
        <symbol id="play-s" viewBox="0 0 19 19"> <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5" /> </symbol>
        {/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
        <title>Artboard</title>
        <desc>Created with Sketch.</desc>
        <g id="Artboard" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21" />
          <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21" />
        </g>
      </symbol></svg>{/* endinject */}
    </div>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header movie-card__head">
          <Logo />
          <User user={user}/>
        </header>
        <div className="movie-card__wrap">
          <div className="movie-card__desc">
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
              <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={poster} alt={title} width={218} height={327} />
          </div>
          <div className="movie-card__desc">
            <Tabs
              genre={genre}
              year={year}
              description={description}
              director={director}
              actors={actors}
              starring={starring}
              duration={duration}
              rating={rating}
              reviewsCount={reviewsCount}
              reviews={reviews}
            />
          </div>
        </div>
      </div>
    </section>
    <div className="page-content">
      <CatalogSimilar films={similarFilms} />
      <footer className="page-footer">
        <Logo />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

FilmScreen.propTypes = {
  currentFilm: PropTypes.shape(filmProps),
  similarFilms: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
  user: PropTypes.shape(userProps),
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewsProp)
  )
};

export default FilmScreen;
