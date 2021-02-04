import React from "react";
import PropTypes from 'prop-types';

const MovieCard = ({title, image}) => {
  return <article className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <img src={image} alt={title} width={280} height={175} />
    </div>
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href="movie-page.html">{title}</a>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
};

export default MovieCard;
