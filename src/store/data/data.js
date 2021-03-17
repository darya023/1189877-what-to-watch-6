import {createReducer} from "@reduxjs/toolkit";
import {changeCurrentFilmID, changeIsSendingData, loadFilms, loadPoster} from "../action-creator";

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
});

export {data};
