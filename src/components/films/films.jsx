import React, {useState} from "react";
import PropTypes from 'prop-types';
import {filmProps} from "../../utils/prop-types";
import MovieCard from "../movie-card/movie-card";

const Films = ({films}) => {
  const [activeMovieCard, setActiveMovieCard] = useState(``);

  return <div className="catalog__movies-list">
    {
      films.map((film) => {
        const {
          id,
          title,
          image,
          promoVideo,
        } = film;

        return <MovieCard
          onMouseEnter={()=>setActiveMovieCard(id)}
          onMouseLeave={()=>setActiveMovieCard(``)}
          activeFilm={activeMovieCard}
          key={id}
          id={id}
          title={title}
          image={image}
          promoVideo={promoVideo}
        />;
      })
    }
  </div>;
};

Films.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
};

export default Films;
