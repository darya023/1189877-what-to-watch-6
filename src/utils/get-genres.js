import {INITIAL_GENRE} from "../const";

export const getGenres = (films) => {
  let genres = [INITIAL_GENRE];

  films.forEach((film)=> {
    return !genres.includes(film.genre) && genres.push(film.genre);
  });

  return genres;
};
