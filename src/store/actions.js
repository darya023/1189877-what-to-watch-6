export const ActionType = {
  CHANGE_GENRE: `/changeGenre`,
  CHANGE_CURRENT_FILM_ID: `/changeCurrentFilmID`,
  SET_GENRES: `/setGenres`,
  RESET_GENRE: `/resetGenre`,
  RESET_CURRENT_FILM_DATA: `/resetCurrentFilmData`,
  LOAD_FILMS: `app/loadFilms`,
  LOAD_POSTER: `app/loadPoster`,
  LOAD_CURRENT_FILM: `films/:id/loadCurrentFilm`,
  LOAD_REVIEWS: `films/:id/loadReviews`,
  CHANGE_AUTHORIZATION_STATUS: `/changeAuthorizationStatus`,
  CHANGE_SENDING_DATA_STATUS: `app/changeSendingDataStatus`,
  CHANGE_POSTER_LOADING_STATUS: `app/changePosterLoadingStatus`,
  CHANGE_FILMS_LOADING_STATUS: `app/changeFilmsLoadingStatus`,
  CHANGE_FILM_LOADING_STATUS: `films/:id/changeFilmLoadingStatus`,
  SET_USER: `login/setUser`,
  REDIRECT_TO_ROUTE: `app/redirectToRoute`,
  UPDATE_FILM: `app/updateFilm`,
};
