import {createSelector} from 'reselect';
import {LoadingStatus} from '../../../const';
import {NameSpace} from '../../root-reducer';

export const getPoster = (state) => state[NameSpace.DATA].poster;
export const getPosterLoadingStatus = (state) => state[NameSpace.DATA].posterLoadingStatus;

export const needSetCurrentFilm = createSelector(
    [getPosterLoadingStatus],
    (posterLoadingStatus) => posterLoadingStatus === LoadingStatus.SUCCESS
);

export const needLoadPoster = createSelector(
    [getPosterLoadingStatus],
    (posterLoadingStatus) => posterLoadingStatus === LoadingStatus.INITIAL
);

export const needShowSpinnerInsteadPoster = createSelector(
    [getPosterLoadingStatus],
    (posterLoadingStatus) => posterLoadingStatus === LoadingStatus.FETCHING
);
