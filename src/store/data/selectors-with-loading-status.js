import {createSelector} from 'reselect';
import {LoadingStatus} from '../../const';
import {getAuthorizationStatus} from '../user/selectors';
import {getCurrentFilm, getFilmLoadingStatus, getFilmsLoadingStatus, getPosterLoadingStatus, getSendingDataStatus} from './selectors';

export const needShowSpinnerInsteadCurrentFilm = createSelector(
    [getFilmLoadingStatus, getCurrentFilm],
    (filmLoadingStatus, currentFilm) => filmLoadingStatus === LoadingStatus.FETCHING && !currentFilm
);

export const needShowSpinnerInsteadFilms = createSelector(
    [getFilmsLoadingStatus],
    (filmsLoadingStatus) => filmsLoadingStatus === LoadingStatus.FETCHING
);

export const needSetCurrentFilm = createSelector(
    [getPosterLoadingStatus],
    (posterLoadingStatus) => posterLoadingStatus === LoadingStatus.SUCCESS
);

export const needLoadPoster = createSelector(
    [getPosterLoadingStatus],
    (posterLoadingStatus) => posterLoadingStatus === LoadingStatus.INITIAL
);

export const needLoadFilms = createSelector(
    [getFilmsLoadingStatus],
    (filmsLoadingStatus) => filmsLoadingStatus === LoadingStatus.INITIAL
);

export const needShowSpinnerInsteadPoster = createSelector(
    [getPosterLoadingStatus],
    (posterLoadingStatus) => posterLoadingStatus === LoadingStatus.FETCHING
);

export const needShowSpinnerInsteadMainScreen = createSelector(
    [needShowSpinnerInsteadFilms, needShowSpinnerInsteadPoster],
    (isSpinnerInsteadFilmsShown, isSpinnerInsteadPosterShown) => isSpinnerInsteadPosterShown && isSpinnerInsteadFilmsShown
);

export const needSetErrorToastText = createSelector(
    [getSendingDataStatus],
    (sendingDataStatus) => sendingDataStatus === LoadingStatus.FAILURE
);

export const needResetSendingDataStatus = createSelector(
    [getSendingDataStatus],
    (sendingDataStatus) => sendingDataStatus === LoadingStatus.SUCCESS
);

export const needDisableElement = createSelector(
    [getSendingDataStatus],
    (sendingDataStatus) => sendingDataStatus === LoadingStatus.FETCHING
);

export const needRedirectFromSigninScreen = createSelector(
    [getAuthorizationStatus, getSendingDataStatus],
    (authorizationStatus, sendingDataStatus) => authorizationStatus && sendingDataStatus !== LoadingStatus.FETCHING
);
