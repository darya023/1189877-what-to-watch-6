import {DataType} from "../const";

export const adaptDataToClient = {
  [DataType.FILMS]: ({
    id,
    name: title,
    poster_image: poster,
    preview_image: image,
    background_image: backgroundImage,
    background_color: backgroundColor,
    scores_count: reviewsCount,
    run_time: duration,
    released: year,
    is_favorite: isFavorite,
    video_link: video,
    preview_video_link: promoVideo,
    ...restProps
  }) => ({
    id: id.toString(),
    title,
    poster,
    image,
    backgroundImage,
    backgroundColor,
    reviewsCount,
    duration,
    year,
    isFavorite,
    video,
    promoVideo,
    ...restProps
  }),
  [DataType.USER]: ({
    id,
    avatar_url: image,
    ...restProps
  }) => ({
    id: id.toString(),
    image,
    ...restProps
  }),
  [DataType.REVIEWS]: ({
    id,
    user: {
      id: authorId,
      name: authorName,
    },
    comment: text,
    ...restProps
  }) => ({
    id: id.toString(),
    authorId: authorId.toString(),
    authorName,
    text,
    ...restProps
  }),
};


