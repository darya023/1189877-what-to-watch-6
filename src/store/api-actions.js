import {adaptDataToClient} from "../utils/adaptDataToClient";
import {ActionCreator} from "./action-creator";

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => data.map(adaptDataToClient))
    .then((data) => dispatch(ActionCreator.loadFilms(data)))
);

export const fetchPoster = () => (dispatch, _getState, api) => (
  api.get(`/films/promo`)
    .then(({data}) => adaptDataToClient(data))
    .then((data) => dispatch(ActionCreator.loadPoster(data)))
    .then((data) => dispatch(ActionCreator.changeCurrentFilm(data.payload.id, true)))
);
