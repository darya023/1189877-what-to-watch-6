import {INITIAL_GENRE} from "../const";

export const getGenres = (films) => {
  const genres = new Set();

  genres.add(INITIAL_GENRE);

  films.forEach((film)=> {
    genres.add(film.genre);
  });

  return genres;
};
