import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import CatalogSimilar from './catalog-similar';
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
    isFavorite: true
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
    genres: []
  },
};
describe(`Test for CatalogSimilar`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
  });

  it(`CatalogSimilar should render correctly`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogSimilar />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilms[2].title))).toBeInTheDocument();
  });
  it(`CatalogSimilar should render correctly without similar films`, () => {
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        films: [],
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogSimilar />
          </Router>
        </Provider>
    );

    expect(screen.queryByText(/More like this/i)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[0].title))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[1].title))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[2].title))).not.toBeInTheDocument();
  });
  it(`CatalogSimilar should render Spinner when data is loading`, () => {
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        filmsLoadingStatus: LoadingStatus.FETCHING
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogSimilar />
          </Router>
        </Provider>
    );

    expect(screen.getByTestId(`spinner`)).toBeInTheDocument();
    expect(screen.queryByText(/More like this/i)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[0].title))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[1].title))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[2].title))).not.toBeInTheDocument();
  });
});
