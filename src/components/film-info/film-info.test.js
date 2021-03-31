import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import FilmInfo from './film-info';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';

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
const fakeStore = {
  DATA: {
    films: [fakeFilm],
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
    genres: []
  },
};
describe(`Test for FilmInfo`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
  });

  it(`FilmInfo should render correctly with AddReviewButton`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <FilmInfo
              id={fakeFilm.id}
              title={fakeFilm.title}
              genre={fakeFilm.genre}
              year={fakeFilm.year}
              isFavorite={fakeFilm.isFavorite}
              hasAddReviewButton={true}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.genre))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.year))).toBeInTheDocument();
  });
  it(`FilmInfo should render correctly without AddReviewButton`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <FilmInfo
              id={fakeFilm.id}
              title={fakeFilm.title}
              genre={fakeFilm.genre}
              year={fakeFilm.year}
              isFavorite={fakeFilm.isFavorite}
              hasAddReviewButton={false}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.genre))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.year))).toBeInTheDocument();
  });
});
