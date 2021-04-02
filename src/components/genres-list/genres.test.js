import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
import * as redux from 'react-redux';

import userEvent from '@testing-library/user-event';
import {GenresList} from './genres-list';
import {getGenres} from '../../utils/get-genres.js';

const mockStore = configureStore({});

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
const fakeFilms = [
  fakeFilm,
  {
    ...fakeFilm,
    id: `2`,
    title: `testTitle`,
    genre: `Comedy`
  },
  {
    ...fakeFilm,
    title: `test2`,
    id: `3`,
  },
];
const fakeStore = {
  DATA: {
    films: fakeFilms,
    poster: fakeFilm,
    filmLoadingStatus: LoadingStatus.SUCCESS,
    filmsLoadingStatus: LoadingStatus.SUCCESS,
    posterLoadingStatus: LoadingStatus.SUCCESS,
    sendingDataStatus: LoadingStatus.INITIAL,
    currentFilmID: fakeFilm.id,
    currentFilm: fakeFilm,
    currentFilmReviews: []
  },
  USER: {
    authorizationStatus: true,
    user: {},
  },
  GENRES: {
    activeGenre: INITIAL_GENRE,
    genres: getGenres(fakeFilms)
  },
};

describe(`Test for GenresList`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`GenresList should render correctly`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <GenresList />
          </Router>
        </Provider>
    );

    expect(screen.getByText(new RegExp(INITIAL_GENRE))).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilms[0].genre)).length).toBe(1);
    expect(screen.getByText(new RegExp(fakeFilms[0].genre))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilms[1].genre))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilms[2].genre))).toBeInTheDocument();
  });
  it(`GenresList should call dispatch when user clicks on genre element`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <GenresList />
          </Router>
        </Provider>
    );

    const genreElement = screen.getByText(new RegExp(fakeFilms[1].genre));
    expect(genreElement).toBeInTheDocument();
    userEvent.click(genreElement);
    expect(fakeDispatch).toHaveBeenCalled();
    expect(screen.getByText(new RegExp(INITIAL_GENRE))).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilms[0].genre)).length).toBe(1);
    expect(screen.getByText(new RegExp(fakeFilms[0].genre))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilms[2].genre))).toBeInTheDocument();
  });
});
