import React from "react";
import PropTypes from 'prop-types';
import HeaderMovieCard from "../header/header-movie-card";

const FilmHeader = ({
  title,
  backgroundImage,
  children
}) => {
  return <>
    <div className="movie-card__bg">
      <img src={backgroundImage} alt={title} />
    </div>
    <h1 className="visually-hidden">WTW</h1>
    <HeaderMovieCard>
      {children}
    </HeaderMovieCard>
  </>;
};

FilmHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  children: PropTypes.node
};

export {FilmHeader};
export default FilmHeader;
