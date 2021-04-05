export const Tab = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export const INITIAL_GENRE = `All genres`;

export const FilterType = {
  All: `All`,
  GENRE: `GENRE`,
  IS_FAVORITE: `IS_FAVORITE`,
  ID: `ID`,
  SIMILAR: `SIMILAR`,
};

export const DataType = {
  FILMS: `FILMS`,
  USER: `USER`,
  REVIEWS: `REVIEWS`,
};

export const APIRoute = {
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  FILMS: `/films`,
  FILM: (id)=>(`/films/${id}`),
  POSTER: `/films/promo`,
  FAVORITE: (id, isFavorite)=>(`/favorite/${id}/${isFavorite ? 0 : 1}`),
  REVIEWS: (id)=>(`/comments/${id}`),
};

export const AppRoute = {
  MAIN: `/`,
  LOGIN: `/login`,
  MY_LIST: `/mylist`,
  FILM: (id)=>(`/films/${id}`),
  ADD_REVIEW: (id)=>(`/films/${id}/review`),
  PLAYER: (id)=>(`/player/${id}`),
  PLAYER_SCHEMA: `/player/:id`,
  FILM_SCHEMA: `/films/:id`,
  ADD_REVIEW_SCHEMA: `/films/:id/review`,
};

export const COUNT_SIMILAR_FILMS = 4;

export const DurationView = {
  LETTERS: `LETTERS`,
  COLON: `COLON`,
};

export const LoadingStatus = {
  INITIAL: `INITIAL`,
  FETCHING: `FETCHING`,
  SUCCESS: `SUCCESS`,
  FAILURE: `FAILURE`,
};

export const HttpCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
};
