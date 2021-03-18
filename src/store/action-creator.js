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

export const changeAuthorizationStatus = createAction(ActionType.CHANGE_AUTHORIZATION_STATUS, (status) => {
  return {
    payload: status
  };
});

export const changeIsSendingData = createAction(ActionType.CHANGE_IS_SENDING, (status) => {
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
