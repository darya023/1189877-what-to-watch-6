import {INITIAL_GENRE} from "../const";

export const getFilms = ({activeGenre, films}, id) => {
  if (activeGenre === INITIAL_GENRE) {
    return films;
  }

  return films.filter((film)=>film.genre === activeGenre && film.id !== id);
};
