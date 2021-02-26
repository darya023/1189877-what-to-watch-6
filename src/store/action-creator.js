import {ActionType} from "./actions";

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getFilms: (allFilms) => ({
    type: ActionType.GET_FILMS,
    payload: allFilms
  }),
  resetGenre: () => ({
    type: ActionType.RESET_GENRE
  }),
};
