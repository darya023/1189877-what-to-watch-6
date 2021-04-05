import {createSelector} from 'reselect';
import {NameSpace} from '../../root-reducer';
import {getAuthorizationStatus} from '../../user/selectors';
import {needShowSpinnerInsteadPoster} from './poster';
import {LoadingStatus} from '../../../const';

export const getSendingDataStatus = (state) => state[NameSpace.DATA].sendingDataStatus;
export const getCurrentFilm = (state) => state[NameSpace.DATA].currentFilm;
export const getFilmsLoadingStatus = (state) => state[NameSpace.DATA].filmsLoadingStatus;

export const needShowSpinnerInsteadFilms = createSelector(
    [getFilmsLoadingStatus],
    (filmsLoadingStatus) => filmsLoadingStatus === LoadingStatus.FETCHING
);

export const needShowNotFoundScreenInsteadAddReviewPage = createSelector(
    [getFilmsLoadingStatus, getCurrentFilm],
    (filmsLoadingStatus, currentFilm) => filmsLoadingStatus === LoadingStatus.FAILURE && !currentFilm
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
