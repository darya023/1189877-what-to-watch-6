import {getRandomInteger} from "./get-random-integer";

export const getRandomFilms = (films, count)=>{
  const lastIndex = films.length - 1;
  let randomIndexes = new Set();

  while (randomIndexes.size < Math.min(lastIndex + 1, count)) {
    randomIndexes.add(getRandomInteger(0, lastIndex));
  }

  const randomSimilarFilms = films.filter((film, index)=>randomIndexes.has(index));

  return randomSimilarFilms;
};
