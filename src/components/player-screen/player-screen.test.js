import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import PlayerScreen from './player-screen';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import {getGenres} from '../../utils/get-genres';

const mockStore = configureStore({});

let history; let pauseStub; let playStub;
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
  it(`PlayerScreen should call dispatch when user clicks on Exit button for poster film`, () => {
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
  it(`PlayerScreen should call playStub when user clicks on Play button`, () => {
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
  it(`PlayerScreen should render Spinner when data is loading`, () => {
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        filmsLoadingStatus: LoadingStatus.FETCHING,
        currentFilm: null
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <PlayerScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByTestId(`spinner`)).toBeInTheDocument();
  });
  it(`PlayerScreen should render NotFoundScreen when there is no current film`, () => {
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        currentFilmID: null
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <PlayerScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
  it(`PlayerScreen should update progress when user clicks on progress bar`, () => {
    const store = mockStore(fakeStore);
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <PlayerScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    const progressBar = container.querySelector(`progress`);
    userEvent.click(progressBar);
    expect(fakeDispatch).toHaveBeenCalled();
  });
});
