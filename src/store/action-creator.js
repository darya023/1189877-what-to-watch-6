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
  changeCurrentFilm: (...payload) => ({
    type: ActionType.CHANGE_CURRENT_FILM,
    payload
  }),
  changeActiveFilter: (filter) => ({
    type: ActionType.CHANGE_ACTIVE_FILTER,
    payload: filter
  })
};
