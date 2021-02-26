import {INITIAL_GENRE} from "../const";
import {films} from "../mocks/films";
import {getFilms} from "../utils/get-films";
import {getGenres} from "../utils/get-genres";
import {ActionType} from "./actions";

const initialState = {
  activeGenre: INITIAL_GENRE,
  genres: getGenres(films),
  films,
  poster: films[0],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        activeGenre: action.payload
      };
    case ActionType.GET_FILMS:
      return {
        ...state,
        films: getFilms(state.activeGenre, films)
      };
    case ActionType.RESET_GENRE:
      return {
        ...initialState
      };

    default:
      return state;
  }
};
