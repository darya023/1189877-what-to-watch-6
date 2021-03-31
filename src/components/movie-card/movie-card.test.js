import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MovieCard from './movie-card';

let history; let pauseStub;
const fakeFilm = {
  id: `1`,
  title: `The Grand Budapest Hotel`,
  image: ``,
  poster: ``,
  backgroundImage: ``,
  backgroundColor: `blue`,
  genre: `Drama`,
  year: 2014,
  video: ``,
  promoVideo: ``,
  description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  duration: 120,
  rating: 7.5,
  reviewsCount: 3,
  isFavorite: false,
};

describe(`Test for MovieCard`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
    pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});
  });

  it(`MovieCard should render correctly`, () => {
    render(
        <Router history={history}>
          <MovieCard
            image={fakeFilm.poster}
            promoVideo={fakeFilm.video}
            isActive={false}
            id={fakeFilm.id}
            title={fakeFilm.title}
            onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()}
          />
        </Router>
    );

    expect(pauseStub).not.toHaveBeenCalled();
    expect(screen.getByText(new RegExp(fakeFilm.title))).toBeInTheDocument();
  });
});
