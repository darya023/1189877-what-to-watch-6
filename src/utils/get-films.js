import {INITIAL_GENRE} from "../const";

export const getFilms = (genre, films, id) => {
  if (genre === INITIAL_GENRE) {
    return films;
  }

  return films.filter((film)=>film.genre === genre && film.id !== id);
};
