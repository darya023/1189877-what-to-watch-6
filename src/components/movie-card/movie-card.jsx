import React from "react";
import {PropType} from "../../utils/const";
import {Link} from "react-router-dom";

const MovieCard = ({id, title, image}) => {
  return <article className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <img src={image} alt={title} width={280} height={175} />
    </div>
    <h3 className="small-movie-card__title">
      <Link to={`/films/` + id} className="small-movie-card__link">{title}</Link>
    </h3>
  </article>;
};

MovieCard.propTypes = PropType.MOVIE_CARD;

export default MovieCard;
