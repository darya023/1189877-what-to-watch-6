import {createReducer} from "@reduxjs/toolkit";
import {changeCurrentFilmID, changeIsSendingData, loadFilms, loadPoster, updateFilm} from "../action-creator";

const initialState = {
  films: [],
  poster: null,
  isFilmsLoaded: false,
  isPosterLoaded: false,
  isSendingData: false,
  currentFilmID: null,
};

const data = createReducer(initialState, (builder) => {
  builder.addCase(loadFilms, (state, action) => {
    state.films = action.payload;
    state.isFilmsLoaded = true;
  });
  builder.addCase(loadPoster, (state, action) => {
    state.poster = action.payload;
    state.isPosterLoaded = true;
  });
  builder.addCase(changeIsSendingData, (state, action) => {
    state.isSendingData = action.payload;
  });
  builder.addCase(changeCurrentFilmID, (state, action) => {
    state.currentFilmID = action.payload;
  });
  builder.addCase(updateFilm, (state, action) => {
    const updatedFilm = action.payload;
    const prevFilm = state.films.find((film) => film.id === updatedFilm.id);
    const prevFilmIndex = state.films.indexOf(prevFilm);

    if (prevFilmIndex !== -1) {
      state.films = [
        ...state.films.slice(0, prevFilmIndex),
        updatedFilm,
        ...state.films.slice(prevFilmIndex + 1)
      ];

      if (updatedFilm.id === state.poster.id) {
        state.poster = updatedFilm;
      }
    }
  });
});

export {data};
