import {ActionType} from "./actions";

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getFilms: () => ({
    type: ActionType.GET_FILMS
  }),
  resetGenre: () => ({
    type: ActionType.RESET_GENRE
  }),
};
