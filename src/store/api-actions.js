import {DataType} from "../const";
import {adaptDataToClient} from "../utils/adaptDataToClient";
import {ActionCreator} from "./action-creator";

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => data.map(adaptDataToClient[DataType.FILMS]))
    .then((data) => dispatch(ActionCreator.loadFilms(data)))
);

export const fetchPoster = () => (dispatch, _getState, api) => (
  api.get(`/films/promo`)
    .then(({data}) => adaptDataToClient[DataType.FILMS](data))
    .then((data) => dispatch(ActionCreator.loadPoster(data)))
    .then((data) => dispatch(ActionCreator.changeCurrentFilm(data.payload.id, true)))
);

export const checkAuthorization = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => adaptDataToClient[DataType.USER](data))
    .then((data) => dispatch(ActionCreator.setUser(data)))
    .then(() => dispatch(ActionCreator.changeAuthorizationStatus(true)))
    .catch(()=>{})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => adaptDataToClient[DataType.USER](data))
    .then((data) => dispatch(ActionCreator.setUser(data)))
    .then(() => dispatch(ActionCreator.changeIsSendingData(false)))
    .then(() => dispatch(ActionCreator.changeAuthorizationStatus(true)))
    .catch(() => {
      dispatch(ActionCreator.changeIsSendingData(false));
      dispatch(ActionCreator.changeAuthorizationStatus(false));
    })
);
