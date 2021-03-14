import {createSelector} from 'reselect';
import {COUNT_SIMILAR_FILMS, INITIAL_GENRE} from '../../const';
import {getRandomFilms} from '../../utils/get-random-films';
import {getActiveGenre} from '../genres/selectors';
import {NameSpace} from '../root-reducer';

export const getFilms = (state) => state[NameSpace.DATA].films;
export const getCurrentFilmID = (state) => state[NameSpace.DATA].currentFilmID;
export const getPoster = (state) => state[NameSpace.DATA].poster;
export const getLoadedFilmsStatus = (state) => state[NameSpace.DATA].isFilmsLoaded;
export const getLoadedPosterStatus = (state) => state[NameSpace.DATA].isPosterLoaded;
export const getSendingDataStatus = (state) => state[NameSpace.DATA].isSendingData;

export const getFilmsByActiveGenre = createSelector(
    [getFilms, getActiveGenre],
    (films, activeGenre) =>
      activeGenre === INITIAL_GENRE
        ? films
        : films.filter((film)=>film.genre === activeGenre)
);

export const getCurrentFilm = createSelector(
    [getFilms, getCurrentFilmID],
    (films, id) => {
      return films.find((film) => film.id === id) || null;
    }
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
