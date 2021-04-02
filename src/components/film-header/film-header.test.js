import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import FilmHeader from './film-header';
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
describe(`Test for FilmHeader`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
  });

  it(`FilmHeader should render correctly without children`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <FilmHeader
              title={fakeFilm.title}
              backgroundImage={fakeFilm.backgroundImage}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByAltText(new RegExp(fakeFilm.title))).toBeInTheDocument();
  });
  it(`FilmHeader should render correctly without children`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <FilmHeader
              title={fakeFilm.title}
              backgroundImage={fakeFilm.backgroundImage}
            >
              <div>Mock child</div>
            </FilmHeader>
          </Router>
        </Provider>
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock child/i)).toBeInTheDocument();
    expect(screen.getByAltText(new RegExp(fakeFilm.title))).toBeInTheDocument();
  });
});
