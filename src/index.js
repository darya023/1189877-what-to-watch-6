import nanoid from "nanoid";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

const POSTER = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  image: `img/the-grand-budapest-hotel-poster.jpg`
};

const Setting = {
  MOVIE_CARDS_COUNT: 20
};

const movieCards = [];

for (let i = 0; i < Setting.MOVIE_CARDS_COUNT; i++) {
  const movieCard = {
    id: nanoid(),
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  };

  movieCards.push(movieCard);
}

ReactDOM.render(
    <App movieCards={movieCards} poster={POSTER}/>,
    document.getElementById(`root`)
);

