import {FilterType, INITIAL_GENRE} from "../const";
import {getRandomFilms} from "./get-random-films";

const COUNT_SIMILAR_FILMS = 4;

export const filter = {
  [FilterType.GENRE]: ({activeGenre, films}) =>{
    if (activeGenre === INITIAL_GENRE) {
      return films;
    }

    return films.filter((film)=>film.genre === activeGenre);
  },
  [FilterType.SIMILAR]: ({films, currentFilm}) =>{
    const similarFilms = films.filter((film)=>film.genre === currentFilm.genre && film.id !== currentFilm.id);

    return getRandomFilms(similarFilms, COUNT_SIMILAR_FILMS);
  },
  [FilterType.ID]: ({films, poster}, [id, isPoster]) =>{
    if (isPoster) {
      return poster;
    }

    return films.find((film) => film.id === id) || {};
  },
  [FilterType.IS_FAVORITE]: ({films}) =>{
    return films.filter((film) => film.isFavorite);
  }
};
