import {createSelector} from 'reselect';
import {INITIAL_GENRE} from '../../const';

export const getFilms = (state) => state.films; // простые функции (без логики) можно не кэшировать

export const getActiveGenre = (state) => state.activeGenre;

// креат селектор закэширует результат по входящим селекторам и в будущем будет отдавть кэш
export const getFilmsByActiveGenre = createSelector(
    [getFilms, getActiveGenre], // сюда добавляем нужные нам селекторы и они прокинут результат в следующую функцию
    (films, activeGenre) => activeGenre === INITIAL_GENRE
      ? films
      : films.filter((film)=>film.genre === activeGenre)
);
