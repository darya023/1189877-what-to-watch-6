import {FilterType, INITIAL_GENRE} from "../const";
import {filter} from "../utils/filter";
import {getGenres} from "../utils/get-genres";
import {ActionType} from "./actions";

const initialState = {
  activeGenre: INITIAL_GENRE,
  activeFilter: FilterType.GENRE,
  genres: [],
  films: [],
  poster: null,
  isFilmsLoaded: false,
  isPosterLoaded: false,
  currentFilm: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        activeGenre: action.payload,
      };
    case ActionType.RESET_GENRE:
      return {
        ...state,
        activeGenre: INITIAL_GENRE
      };
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        genres: getGenres(action.payload),
        isFilmsLoaded: true
      };
    case ActionType.LOAD_POSTER:
      return {
        ...state,
        poster: action.payload,
        isPosterLoaded: true
      };
    case ActionType.CHANGE_CURRENT_FILM:
      return {
        ...state,
        currentFilm: filter[FilterType.ID](state, action.payload),
      };
    case ActionType.CHANGE_ACTIVE_FILTER:
      return {
        ...state,
        activeFilter: action.payload,
      };
    default:
      return state;
  }
};
