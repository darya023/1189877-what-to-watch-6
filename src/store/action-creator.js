import {ActionType} from "./actions";

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  resetGenre: () => ({
    type: ActionType.RESET_GENRE
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films
  }),
  loadPoster: (poster) => ({
    type: ActionType.LOAD_POSTER,
    payload: poster
  }),
  changeAuthorizationStatus: (status) => ({
    type: ActionType.CHANGE_AUTHORIZATION_STATUS,
    payload: status
  }),
  changeIsSendingData: (status) => ({
    type: ActionType.CHANGE_IS_SENDING,
    payload: status
  }),
  setUser: (user) => ({
    type: ActionType.SET_USER,
    payload: user
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  })
};
