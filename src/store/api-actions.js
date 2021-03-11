import {batch} from "react-redux";
import {APIRoute, DataType} from "../const";
import {adaptDataToClient} from "../utils/adaptDataToClient";
import {ActionCreator} from "./action-creator";

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => data.map(adaptDataToClient[DataType.FILMS]))
    .then((data) => dispatch(ActionCreator.loadFilms(data)))
);

export const fetchPoster = () => (dispatch, _getState, api) => (
  api.get(APIRoute.POSTER)
    .then(({data}) => adaptDataToClient[DataType.FILMS](data))
    .then((data) => dispatch(ActionCreator.loadPoster(data)))
);

export const checkAuthorization = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN)
    .then(({data})=>adaptDataToClient[DataType.USER](data))
    .then((data) => {
      batch(() => {
        dispatch(ActionCreator.setUser(data));
        dispatch(ActionCreator.changeAuthorizationStatus(true));
      });
    });
};

export const login = ({email, password}) => (dispatch, _getState, api) => {
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data})=>adaptDataToClient[DataType.USER](data))
    .then((data) => {
      batch(() => {
        dispatch(ActionCreator.setUser(data));
        dispatch(ActionCreator.changeIsSendingData(false));
        dispatch(ActionCreator.changeAuthorizationStatus(true));
        dispatch(ActionCreator.redirectToRoute(`/`));
      });
    })
    .catch(() => {
      batch(() => {
        dispatch(ActionCreator.changeIsSendingData(false));
        dispatch(ActionCreator.changeAuthorizationStatus(false));
      });
    });
};
