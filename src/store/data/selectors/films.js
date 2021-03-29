import {createSelector} from 'reselect';
import {COUNT_SIMILAR_FILMS, INITIAL_GENRE, LoadingStatus} from '../../../const';
import {getRandomFilms} from '../../../utils/get-random-films';
import {getActiveGenre} from '../../genres/selectors';
import {NameSpace} from '../../root-reducer';
import {getCurrentFilm, getFilmsLoadingStatus} from './selectors';

export const getFilms = (state) => state[NameSpace.DATA].films;

export const needLoadFilms = createSelector(
    [getFilmsLoadingStatus],
    (filmsLoadingStatus) => filmsLoadingStatus === LoadingStatus.INITIAL
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
