import React, {useState} from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card/movie-card";
import {filmProps} from "../film-screen/film-screen.prop";
import {connect} from "react-redux";
import {filter} from "../../utils/filter";

const Films = ({films}) => {
  const [activeMovieCardId, setActiveMovieCardId] = useState(``);

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
  ),
};

const mapStateToProps = (state) => ({
  films: filter[state.activeFilter](state)
});

export {Films};
export default connect(mapStateToProps, null)(Films);
