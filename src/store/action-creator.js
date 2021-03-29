import {createAction} from "@reduxjs/toolkit";
import {ActionType} from "./actions";

export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => {
  return {
    payload: genre
  };
});

export const resetGenre = createAction(ActionType.RESET_GENRE);

export const loadFilms = createAction(ActionType.LOAD_FILMS, (films) => {
  return {
    payload: films
  };
});

export const loadCurrentFilm = createAction(ActionType.LOAD_CURRENT_FILM, (films) => {
  return {
    payload: films
  };
});

export const setGenres = createAction(ActionType.SET_GENRES, (films) => {
  return {
    payload: films
  };
});

export const loadPoster = createAction(ActionType.LOAD_POSTER, (poster) => {
  return {
    payload: poster
  };
});

export const changeLoadingPosterStatus = createAction(ActionType.CHANGE_POSTER_LOADING_STATUS, (status) => {
  return {
    payload: status
  };
});

export const changeLoadingFilmsStatus = createAction(ActionType.CHANGE_FILMS_LOADING_STATUS, (status) => {
  return {
    payload: status
  };
});

export const changeLoadingFilmStatus = createAction(ActionType.CHANGE_FILM_LOADING_STATUS, (status) => {
  return {
    payload: status
  };
});

export const changeAuthorizationStatus = createAction(ActionType.CHANGE_AUTHORIZATION_STATUS, (status) => {
  return {
    payload: status
  };
});

export const changeSendingDataStatus = createAction(ActionType.CHANGE_SENDING_DATA_STATUS, (status) => {
  return {
    payload: status
  };
});

export const setUser = createAction(ActionType.SET_USER, (user) => {
  return {
    payload: user
  };
});

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url
  };
});

export const changeCurrentFilmID = createAction(ActionType.CHANGE_CURRENT_FILM_ID, (id) => {
  return {
    payload: id
  };
});

export const updateFilm = createAction(ActionType.UPDATE_FILM, (film) => {
  return {
    payload: film
  };
});

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews) => {
  return {
    payload: reviews
  };
});

export const resetCurrentFilmData = createAction(ActionType.RESET_CURRENT_FILM_DATA);
