import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import CatalogFavorites from './catalog-favorites';
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
    title: `test`,
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
describe(`Test for CatalogFavorites`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
  });

  it(`CatalogFavorites should render correctly`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogFavorites />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilms[2].title))).toBeInTheDocument();
  });
  it(`CatalogFavorites should render correctly without favorite films`, () => {
    const fakeFilmsWithoutFavorite = [
      fakeFilm,
      {
        ...fakeFilm,
        id: `2`,
        title: `test`,
        genre: `Comedy`
      },
      {
        ...fakeFilm,
        title: `test2`,
        id: `3`,
        isFavorite: false
      },
    ];
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        films: fakeFilmsWithoutFavorite,
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogFavorites />
          </Router>
        </Provider>
    );

    expect(screen.queryByText(/Catalog/i)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[2].title))).not.toBeInTheDocument();
  });
  it(`CatalogFavorites should render Spinner when data is loading`, () => {
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
            <CatalogFavorites />
          </Router>
        </Provider>
    );

    expect(screen.getByTestId(`spinner`)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilm.title))).not.toBeInTheDocument();
    expect(screen.queryByText(/Catalog/i)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[2].title))).not.toBeInTheDocument();
  });
});
