import {FilterType, INITIAL_GENRE} from "../const";
import {getRandomFilms} from "./get-random-films";

const COUNT_SIMILAR_FILMS = 4;

export const filter = {
  [FilterType.ALL]: ({films}) => films,
  [FilterType.GENRE]: ({activeGenre, films}) =>{
    if (activeGenre === INITIAL_GENRE) {
      return films;
    }

    return films.filter((film)=>film.genre === activeGenre);
  },
  [FilterType.SIMILAR]: ({films}, currentFilmId, currentFilmGenre) =>{
    const similarFilms = films.filter((film)=>film.genre === currentFilmGenre && film.id !== currentFilmId);

    return getRandomFilms(similarFilms, COUNT_SIMILAR_FILMS);
  },
  [FilterType.ID]: ({films}, id) =>{
    return films.find((film) => film.id === id) || null;
  },
  [FilterType.IS_FAVORITE]: ({films}) =>{
    return films.filter((film) => film.isFavorite);
  }
};
