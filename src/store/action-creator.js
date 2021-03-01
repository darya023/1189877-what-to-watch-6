import {ActionType} from "./actions";

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  resetGenre: () => ({
    type: ActionType.RESET_GENRE
  }),
};
