import {createSelector} from 'reselect';
import {LoadingStatus} from '../../../const';
import {NameSpace} from '../../root-reducer';
import {getFilms} from './films';
import {getCurrentFilm} from './selectors';

export const getCurrentFilmID = (state) => state[NameSpace.DATA].currentFilmID;
export const getCurrentFilmReviews = (state) => state[NameSpace.DATA].currentFilmReviews;
export const getFilmLoadingStatus = (state) => state[NameSpace.DATA].filmLoadingStatus;

export const needShowSpinnerInsteadCurrentFilm = createSelector(
    [getFilmLoadingStatus, getCurrentFilm],
    (filmLoadingStatus, currentFilm) => filmLoadingStatus === LoadingStatus.FETCHING && !currentFilm
);

export const getCurrentFilmFromFilmsList = createSelector(
    [getFilms, getCurrentFilmID],
    (films, id) => films.find((film) => film.id === id)
);
