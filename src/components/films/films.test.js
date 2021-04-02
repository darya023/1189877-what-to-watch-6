import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Films from './films';

let history;
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

describe(`Test for Films`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
  });

  it(`Films should render correctly`, () => {
    render(
        <Router history={history}>
          <Films films={[fakeFilm]} />
        </Router>
    );

    expect(screen.getByText(new RegExp(fakeFilm.title))).toBeInTheDocument();
  });
  it(`Films should render correctly without films`, () => {
    render(
        <Router history={history}>
          <Films films={[]} />
        </Router>
    );

    expect(screen.queryByText(new RegExp(fakeFilm.title))).not.toBeInTheDocument();
  });
});
