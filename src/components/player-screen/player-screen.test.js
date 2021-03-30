import React from 'react';
import {fireEvent, getByText, render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import PlayerScreen from './player-screen';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
import * as redux from 'react-redux';

import userEvent from '@testing-library/user-event';
import PrivateRoute from '../private-route/private-route';
import {getGenres} from '../../utils/get-genres';

const mockStore = configureStore({});

let history; let pauseStub; let playStub; let fullScreenStub;
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
    genres: getGenres(fakeFilms)
  },
};
describe(`Test for PlayerScreen`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/player/${fakeFilm.id}`);
    jest.clearAllMocks();
    pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});
    playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});
    // does not work
    fullScreenStub = jest
      .spyOn(document.documentElement, `requestFullscreen`)
      .mockImplementation(() => {});
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`PlayerScreen should render correctly`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <PlayerScreen currentFilmID={fakeFilm.id}/>
          </Router>
        </Provider>
    );

    expect(pauseStub).toHaveBeenCalled();
    // pauseStub.mockRestore();

    expect(screen.getByText(new RegExp(fakeFilm.title))).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });
  it(`PlayerScreen should call dispatch when user click on Exit button for poster film`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <PlayerScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(pauseStub).toHaveBeenCalled();
    // pauseStub.mockRestore();
    userEvent.click(screen.getByText(/Exit/i));
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`PlayerScreen should call playStub when user click on Play button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <PlayerScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(pauseStub).toHaveBeenCalled();
    // pauseStub.mockRestore();
    userEvent.click(screen.getByText(/Play/i));
    expect(playStub).toHaveBeenCalled();
  });
  it(`PlayerScreen should call pauseStub when user drag Toggler`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <PlayerScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    fireEvent.drag(screen.getByText(/Toggler/i), {});
    expect(pauseStub).toHaveBeenCalled();
    // pauseStub.mockRestore();
  });
  it(`PlayerScreen should call fullScreenStub when user click Full screen button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <PlayerScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    // does not work
    userEvent.click(screen.getByText(/Full screen/i));
    expect(fullScreenStub).toHaveBeenCalled();
  });
});
