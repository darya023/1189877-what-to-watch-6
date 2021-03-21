import {batch} from "react-redux";
import {APIRoute, DataType} from "../const";
import {adaptDataToClient} from "../utils/adaptDataToClient";
import {changeAuthorizationStatus, changeIsSendingData, loadFilms, loadPoster, redirectToRoute, setGenres, setUser, updateFilm} from "./action-creator";

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => data.map(adaptDataToClient[DataType.FILMS]))
    .then((data) => {
      batch(() => {
        dispatch(loadFilms(data));
        dispatch(setGenres(data));
      });
    })
);

export const fetchPoster = () => (dispatch, _getState, api) => (
  api.get(APIRoute.POSTER)
    .then(({data}) => adaptDataToClient[DataType.FILMS](data))
    .then((data) => dispatch(loadPoster(data)))
);

export const checkAuthorization = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN)
    .then(({data})=>adaptDataToClient[DataType.USER](data))
    .then((data) => {
      batch(() => {
        dispatch(setUser(data));
        dispatch(changeAuthorizationStatus(true));
      });
    });
};

export const login = ({email, password}) => (dispatch, _getState, api) => {
  dispatch(changeIsSendingData(true));
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data})=>adaptDataToClient[DataType.USER](data))
    .then((data) => {
      batch(() => {
        dispatch(setUser(data));
        dispatch(changeIsSendingData(false));
        dispatch(changeAuthorizationStatus(true));
        dispatch(redirectToRoute(`/`));
      });
    })
    .catch(() => {
      batch(() => {
        dispatch(changeIsSendingData(false));
        dispatch(changeAuthorizationStatus(false));
      });
    });
};

export const toggleIsFavoriteKey = ({id, isFavorite}) => (dispatch, _getState, api) => {
  dispatch(changeIsSendingData(true));
  api.post(`${APIRoute.FAVORITE}/${id}/${isFavorite ? 0 : 1}`)
    .then(({data})=>adaptDataToClient[DataType.FILMS](data))
    .then((data) => {
      batch(() => {
        dispatch(updateFilm(data));
        dispatch(changeIsSendingData(false));
      });
    })
    .catch(() => {
      dispatch(changeIsSendingData(false));
    });
};
