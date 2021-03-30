import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import {LoadingStatus} from '../../const';

const INITIAL_GENRE = `All genres`;
const mockStore = configureStore({});
const fakeUser = {
  id: `1`,
  name: `User`,
  image: ``,
  email: ``
};
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
const fakeReviews = [
  {
    text: `Test 1`,
    date: `2021-02-23T08:04:28.658Z`,
    id: `1`,
    rating: 3.2,
    authorId: `19`,
    authorName: `Test1`
  },
  {
    text: `Test 2`,
    date: `2020-02-03T08:00:28.000Z`,
    id: `1`,
    rating: 7,
    authorId: `2`,
    authorName: `Test2`
  }
];
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
    currentFilmReviews: fakeReviews
  },
  USER: {
    authorizationStatus: false,
    user: null,
  },
  GENRES: {
    activeGenre: INITIAL_GENRE,
    genres: []
  },
};
const store = mockStore(fakeStore);

describe(`Test routing`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  jest.spyOn(redux, `useSelector`);
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);
  it(`Render 'MainScreen' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getAllByText(/The Grand Budapest Hotel/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/The Grand Budapest Hotel/i)[1]).toBeInTheDocument();
    expect(screen.getByText(/Drama/i)).toBeInTheDocument();
    expect(screen.getByText(/2014/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
  it(`Render 'SignInScreen' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(`/login`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)[1]).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
  it(`Render 'MyListScreen' when user navigate to '/mylist' url`, () => {
    const testStore = mockStore({
      ...fakeStore,
      USER: {
        authorizationStatus: true,
        user: fakeUser,
      },
    });
    const history = createMemoryHistory();
    history.push(`/mylist`);
    render(
        <redux.Provider store={testStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
  it(`Render 'FilmScreen' when user navigate to '/films/1' url`, () => {
    const history = createMemoryHistory();
    history.push(`/films/1`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/Drama/i)).toBeInTheDocument();
    expect(screen.getByText(/2014/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();

    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`Render 'AddReviewScreen' when user navigate to '/films/1/review' url`, () => {
    const testStore = mockStore({
      ...fakeStore,
      USER: {
        authorizationStatus: true,
        user: fakeUser,
      },
    });
    const history = createMemoryHistory();
    history.push(`/films/1/review`);
    render(
        <redux.Provider store={testStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });
  it(`Render 'PlayerScreen' when user navigate to '/player/1' url`, () => {
    const testStore = mockStore({
      ...fakeStore,
      USER: {
        authorizationStatus: true,
        user: fakeUser,
      },
    });
    const history = createMemoryHistory();
    history.push(`/player/1`);
    const pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});
    render(
        <redux.Provider store={testStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(pauseStub).toHaveBeenCalled();
    pauseStub.mockRestore();

    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
  });
  it(`Render 'NotFoundScreen' when user navigate to '/test' url`, () => {
    const history = createMemoryHistory();
    history.push(`/test`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to homepage/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
});
