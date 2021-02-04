import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";

const App = ({movieCards, poster}) => {
  return <Main movieCards={movieCards} poster={poster}/>;
};

App.propTypes = {
  movieCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
      })
  ),
  poster: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    image: PropTypes.string
  })
};

export default App;
