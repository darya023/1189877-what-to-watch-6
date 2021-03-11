import {INITIAL_GENRE} from "../const";
import {getGenres} from "../utils/get-genres";
import {ActionType} from "./actions";

const initialState = {
  activeGenre: INITIAL_GENRE,
  genres: [],
  films: [],
  poster: null,
  isFilmsLoaded: false,
  isPosterLoaded: false,
  isSendingData: false,
  authorizationStatus: false,
  user: null,
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
    case ActionType.CHANGE_AUTHORIZATION_STATUS:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.CHANGE_IS_SENDING:
      return {
        ...state,
        isSendingData: action.payload,
      };
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
