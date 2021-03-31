import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import {Tabs} from './tabs';
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

describe(`Test for Tabs`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`Tabs should render correctly`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Tabs
              genre={fakeFilm.genre}
              year={fakeFilm.year}
              description={fakeFilm.description}
              director={fakeFilm.director}
              starring={fakeFilm.starring}
              duration={fakeFilm.duration}
              rating={fakeFilm.rating}
              reviewsCount={fakeFilm.reviewsCount}
              reviews={[]}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(new RegExp(fakeFilm.rating))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.description))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.reviewsCount))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.director))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.starring[0]))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.starring[1]))).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Good/i)).toBeInTheDocument();
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
  });
  it(`Tabs should call dispatch when user clicks on tab`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Tabs
              genre={fakeFilm.genre}
              year={fakeFilm.year}
              description={fakeFilm.description}
              director={fakeFilm.director}
              starring={fakeFilm.starring}
              duration={fakeFilm.duration}
              rating={fakeFilm.rating}
              reviewsCount={fakeFilm.reviewsCount}
              reviews={[]}
            />
          </Router>
        </Provider>
    );

    const tab = screen.getByText(/Details/i);
    expect(tab).toBeInTheDocument();
    userEvent.click(tab);
    expect(screen.getByText(/Run time/i)).toBeInTheDocument();
    expect(screen.getByText(/2h 00m/i)).toBeInTheDocument();
  });
});
