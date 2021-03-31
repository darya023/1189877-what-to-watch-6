import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import CatalogMain from './catalog-main';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';

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
describe(`Test for CatalogMain`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`CatalogMain should render correctly`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogMain />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilms[0].title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilms[1].title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilms[2].title))).toBeInTheDocument();
  });
  it(`CatalogMain should render correctly without films`, () => {
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
            <CatalogMain />
          </Router>
        </Provider>
    );

    expect(screen.queryByText(/Catalog/i)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[0].title))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[1].title))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[2].title))).not.toBeInTheDocument();
  });
  it(`CatalogMain should render Spinner when data is loading`, () => {
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
            <CatalogMain />
          </Router>
        </Provider>
    );

    expect(screen.getByTestId(`spinner`)).toBeInTheDocument();
    expect(screen.queryByText(/Catalog/i)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[0].title))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[1].title))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilms[2].title))).not.toBeInTheDocument();
  });
  it(`CatalogMain should render 8 movie cards and showMoreButton if films.length > 8 and shows more 8 cards when user clicks on showMoreButton`, () => {
    const fakeFilmsWithLargeLength = new Array(18).fill().map((_item, index)=>({...fakeFilm, id: index.toString()}));
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        films: fakeFilmsWithLargeLength
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogMain />
          </Router>
        </Provider>
    );

    expect(screen.getAllByText(new RegExp(fakeFilm.title)).length).toBe(8);
    const showMoreButton = screen.queryByText(/Show more/i);
    userEvent.click(showMoreButton);
    expect(screen.getAllByText(new RegExp(fakeFilm.title)).length).toBe(16);
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`CatalogMain should render 8 movie cards and showMoreButton if films.length = 16 and shows more all cards when user clicks on showMoreButton`, () => {
    const fakeFilmsWithMediumLength = new Array(16).fill().map((_item, index)=>({...fakeFilm, id: index.toString()}));
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        films: fakeFilmsWithMediumLength
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogMain />
          </Router>
        </Provider>
    );

    expect(screen.getAllByText(new RegExp(fakeFilm.title)).length).toBe(8);
    const showMoreButton = screen.queryByText(/Show more/i);
    userEvent.click(showMoreButton);
    expect(screen.getAllByText(new RegExp(fakeFilm.title)).length).toBe(16);
    expect(screen.queryByText(/Show more/i)).not.toBeInTheDocument();
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`CatalogMain should render all movie cards and not render showMoreButton if films.length < 8`, () => {
    const fakeFilmsWithSmallLength = new Array(7).fill().map((_item, index)=>({...fakeFilm, id: index.toString()}));
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        films: fakeFilmsWithSmallLength
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <CatalogMain />
          </Router>
        </Provider>
    );

    expect(screen.getAllByText(new RegExp(fakeFilm.title)).length).toBe(7);
    expect(screen.queryByText(/Show more/i)).not.toBeInTheDocument();
  });
});
