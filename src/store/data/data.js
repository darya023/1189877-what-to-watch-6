import {createReducer} from "@reduxjs/toolkit";
import {changeCurrentFilmID, changeSendingDataStatus, loadReviews, loadFilms, loadPoster, updateFilm, loadCurrentFilm, changeLoadingPosterStatus, changeLoadingFilmsStatus, changeLoadingFilmStatus} from "../action-creator";

const initialState = {
  films: [],
  currentFilmReviews: [],
  poster: null,
  posterLoadingStatus: null,
  filmLoadingStatus: null,
  filmsLoadingStatus: null,
  sendingDataStatus: null,
  currentFilmID: null,
  currentFilm: null,
};

const data = createReducer(initialState, (builder) => {
  builder.addCase(loadFilms, (state, action) => {
    state.films = action.payload;
  });
  builder.addCase(loadPoster, (state, action) => {
    state.poster = action.payload;
  });
  builder.addCase(changeLoadingPosterStatus, (state, action) => {
    state.posterLoadingStatus = action.payload;
  });
  builder.addCase(changeLoadingFilmsStatus, (state, action) => {
    state.filmsLoadingStatus = action.payload;
  });
  builder.addCase(changeLoadingFilmStatus, (state, action) => {
    state.filmLoadingStatus = action.payload;
  });
  builder.addCase(loadReviews, (state, action) => {
    state.currentFilmReviews = action.payload;
  });
  builder.addCase(changeSendingDataStatus, (state, action) => {
    state.sendingDataStatus = action.payload;
  });
  builder.addCase(changeCurrentFilmID, (state, action) => {
    state.currentFilmID = action.payload;
  });
  builder.addCase(loadCurrentFilm, (state, action) => {
    state.currentFilm = action.payload;
  });
  builder.addCase(updateFilm, (state, action) => {
    const updatedFilm = action.payload;

    state.currentFilm = updatedFilm;

    if (state.poster && updatedFilm.id === state.poster.id) {
      state.poster = updatedFilm;
    }

    const prevFilmIndex = state.films.findIndex((film) => film.id === updatedFilm.id);

    if (prevFilmIndex !== -1) {
      state.films = [
        ...state.films.slice(0, prevFilmIndex),
        updatedFilm,
        ...state.films.slice(prevFilmIndex + 1)
      ];
    }
  });
});

export {data};
