import {createReducer} from "@reduxjs/toolkit";
import {INITIAL_GENRE} from "../../const";
import {getGenres} from "../../utils/get-genres";
import {changeGenre, resetGenre, setGenres} from "../action-creator";

const initialState = {
  activeGenre: INITIAL_GENRE,
  genres: []
};

const genres = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.activeGenre = action.payload;
  });
  builder.addCase(resetGenre, (state, _action) => {
    state.activeGenre = INITIAL_GENRE;
  });
  builder.addCase(setGenres, (state, action) => {
    state.genres = getGenres(action.payload);
  });
});

export {genres};
