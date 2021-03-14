import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card/movie-card";
import {filmProps} from "../film-screen/film-screen.prop";

const Films = ({films}) => {
  const [activeMovieCardId, setActiveMovieCardId] = useState(``);
  useCallback(setActiveMovieCardId);

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
          onMouseEnter={()=>setActiveMovieCardId(id)}
          onMouseLeave={()=>setActiveMovieCardId(``)}
          isActive={activeMovieCardId === id}
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
  ).isRequired,
};

export default Films;
// export default React.memo(Films, (prevProps, nextProps) => {
//   return prevProps.films === nextProps.films;
// });
