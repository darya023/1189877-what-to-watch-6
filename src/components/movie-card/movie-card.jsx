import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const MovieCard = ({
  id,
  title,
  image,
  promoVideo,
  onMouseEnter,
  onMouseLeave,
  isActive
}) => {
  return <article onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="small-movie-card catalog__movies-card">
    {isActive ?
      <video src={promoVideo} autoPlay className="small-movie-card__video" width={280} height={175} poster={image} />
      : <div className="small-movie-card__image">
        <img src={image} alt={title} width={280} height={175} />
      </div>
    }
    <h3 className="small-movie-card__title">
      <Link to={`/films/${id}`} className="small-movie-card__link">{title}</Link>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  promoVideo: PropTypes.string.isRequired,
};

export default MovieCard;
