import React from "react";
import Poster from "./poster";

const PosterSmall = (props) => {
  return <Poster className="movie-card__poster--small" {...props}/>;
};

export {PosterSmall};
export default PosterSmall;
