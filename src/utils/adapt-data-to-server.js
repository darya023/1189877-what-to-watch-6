import {DataType} from "../const";

export const adaptDataToServer = {
  [DataType.REVIEWS]: (reviewData) => ({
    rating: reviewData.rating,
    comment: reviewData[`review-text`],
  }),
};
