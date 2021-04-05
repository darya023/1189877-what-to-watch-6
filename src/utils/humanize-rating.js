export const humanizeRating = (rating) => {
  const RatingThreshold = {
    BAD: 3,
    NORMAL: 5,
    GOOD: 8,
    VERY_GOOD: 10,
  };
  const RatingName = {
    BAD: `Bad`,
    NORMAL: `Normal`,
    GOOD: `Good`,
    VERY_GOOD: `Very good`,
    AWESOME: `Awesome`,
  };

  rating = Number(rating);

  if (rating < RatingThreshold.BAD) {
    return RatingName.BAD;
  }

  if (rating < RatingThreshold.NORMAL) {
    return RatingName.NORMAL;
  }

  if (rating < RatingThreshold.GOOD) {
    return RatingName.GOOD;
  }

  if (rating < RatingThreshold.VERY_GOOD) {
    return RatingName.VERY_GOOD;
  }

  return RatingName.AWESOME;
};
