import {createSelector} from 'reselect';
import {COUNT_SIMILAR_FILMS, INITIAL_GENRE} from '../../const';
import {getRandomFilms} from '../../utils/get-random-films';
import {getActiveGenre} from '../genres/selectors';
import {NameSpace} from '../root-reducer';

export const getFilms = (state) => state[NameSpace.DATA].films;
export const getCurrentFilmID = (state) => state[NameSpace.DATA].currentFilmID;
export const getCurrentFilm = (state) => state[NameSpace.DATA].currentFilm;
export const getCurrentFilmReviews = (state) => state[NameSpace.DATA].currentFilmReviews;
export const getPoster = (state) => state[NameSpace.DATA].poster;
export const getFilmsLoadingStatus = (state) => state[NameSpace.DATA].filmsLoadingStatus;
export const getFilmLoadingStatus = (state) => state[NameSpace.DATA].filmLoadingStatus;
export const getPosterLoadingStatus = (state) => state[NameSpace.DATA].posterLoadingStatus;
export const getSendingDataStatus = (state) => state[NameSpace.DATA].sendingDataStatus;

export const getCurrentFilmFromFilmsList = createSelector(
    [getFilms, getCurrentFilmID],
    (films, id) => films.find((film) => film.id === id)
);

export const getFilmsByActiveGenre = createSelector(
    [getFilms, getActiveGenre],
    (films, activeGenre) =>
      activeGenre === INITIAL_GENRE
        ? films
        : films.filter((film)=>film.genre === activeGenre)
);

export const getFavoriteFilms = createSelector(
    [getFilms],
    (films) => films.filter((film) => film.isFavorite)
);

export const getSimilarFilms = createSelector(
    [getFilms, getCurrentFilm],
    (films, currentFilm) => {
      const similarFilms = films.filter((film)=>film.genre === currentFilm.genre && film.id !== currentFilm.id);

      return getRandomFilms(similarFilms, COUNT_SIMILAR_FILMS);
    }
);
