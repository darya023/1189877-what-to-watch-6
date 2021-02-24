export const humanizeRating = (filmRating) => {
  filmRating = Number(filmRating);

  if (filmRating < 3) {
    return `Bad`;
  }

  if (filmRating < 5) {
    return `Normal`;
  }

  if (filmRating < 8) {
    return `Good`;
  }

  if (filmRating < 10) {
    return `Very good`;
  }

  return `Awesome`;
};
