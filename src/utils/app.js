export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFilms = (films, count)=>{
  const lastIndex = films.length - 1;
  let randomIndexes = new Set();

  while (randomIndexes.size < Math.min(lastIndex + 1, count)) {
    randomIndexes.add(getRandomInteger(0, lastIndex));
  }

  const randomSimilarFilms = films.filter((film, index)=>randomIndexes.has(index));

  return randomSimilarFilms;
};
