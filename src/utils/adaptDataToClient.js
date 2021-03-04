export const adaptDataToClient = (film) => {
  const adaptedFilm = Object.assign(
      {},
      film,
      {
        id: film.id.toString(),
        title: film.name,
        poster: film.poster_image,
        image: film.preview_image,
        backgroundImage: film.background_image,
        backgroundColor: film.background_color,
        reviewsCount: film.scores_count,
        duration: film.run_time,
        year: film.released,
        isFavorite: film.is_favorite,
        video: film.video_link,
        promoVideo: film.preview_video_link,
        actors: film.starring,
      }
  );

  delete adaptedFilm.name;
  delete adaptedFilm.poster_image;
  delete adaptedFilm.preview_image;
  delete adaptedFilm.background_image;
  delete adaptedFilm.background_color;
  delete adaptedFilm.scores_count;
  delete adaptedFilm.run_time;
  delete adaptedFilm.released;
  delete adaptedFilm.is_favorite;
  delete adaptedFilm.video_link;
  delete adaptedFilm.preview_video_link;

  return adaptedFilm;
};
