import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MainScreen from './main-screen';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
import * as redux from 'react-redux';

import userEvent from '@testing-library/user-event';
import PrivateRoute from '../private-route/private-route';
import {getGenres} from '../../utils/get-genres';

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
describe(`Test for MainScreen`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/`);
    jest.clearAllMocks();
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);
  const genres = fakeStore.GENRES.genres;

  it(`MainScreen should render correctly`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen />
          </Router>
        </Provider>
    );

    expect(screen.getAllByRole(`link`, {name: /W T W/i})[0]).toBeInTheDocument();
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[1]).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /User avatar/i})).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.title))[0]).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.genre))[0]).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.year))[0]).toBeInTheDocument();
    expect(genres).toHaveLength(3);
    expect(screen.getByText(new RegExp(genres[0]))).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(genres[1]))[0]).toBeInTheDocument();
    expect(screen.getByText(new RegExp(genres[2]))).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`MainScreen should redirect to MainScreen when user click on logo`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/`}>
                <MainScreen />
              </Route>
              <Route exact path={`/`}>
                <MainScreen />
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[0]);
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[0]).toBeInTheDocument();
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[1]).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /User avatar/i})).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.title))[0]).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.genre))[0]).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.year))[0]).toBeInTheDocument();
    expect(genres).toHaveLength(3);
    expect(screen.getByText(new RegExp(genres[0]))).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(genres[1]))[0]).toBeInTheDocument();
    expect(screen.getByText(new RegExp(genres[2]))).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(fakeDispatch).toHaveBeenCalled();
    history.push(`/`);
    userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[1]);
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[0]).toBeInTheDocument();
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[1]).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /User avatar/i})).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.title))[0]).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.genre))[0]).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(fakeFilm.year))[0]).toBeInTheDocument();
    expect(genres).toHaveLength(3);
    expect(screen.getByText(new RegExp(genres[0]))).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(genres[1]))[0]).toBeInTheDocument();
    expect(screen.getByText(new RegExp(genres[2]))).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`MainScreen should redirect to mylist screen when user authoirized and click on User avatar`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/`}>
                <MainScreen />
              </Route>
              <Route exact path={`/mylist`}><div>Mock MyList Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /User avatar/i}));
    expect(screen.getByText(/Mock MyList Screen/i));
  });
  it(`MainScreen should redirect to signin screen when user not authoirized click on Sign in`, () => {
    const store = mockStore({
      ...fakeStore,
      USER: {
        authorizationStatus: false,
        user: null
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/`}>
                <MainScreen />
              </Route>
              <Route exact path={`/login`}><div>Mock Signin Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /Sign in/i}));
    expect(screen.getByText(/Mock Signin Screen/i));
  });
  it(`MainScreen should redirect to player screen when user click on Play button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/`}>
                <MainScreen />
              </Route>
              <Route exact path={`/player/:id`}><div>Mock Player Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /Play/i}));
    expect(screen.getByText(/Mock Player Screen/i));
  });
  it(`MainScreen should redirect to film screen when user click on film card`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/`}>
                <MainScreen />
              </Route>
              <Route exact path={`/films/:id`}><div>Mock Film Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /test2/i}));
    expect(screen.getByText(/Mock Film Screen/i));
  });
  it(`MainScreen should call dispatch when user authorized and click on + My list button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`button`, {name: /My list/i}));
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`MainScreen should redirect to signin screen when user not authorized and click on + My list button`, () => {
    const store = mockStore({
      ...fakeStore,
      USER: {
        authorizationStatus: false,
        user: null
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`button`, {name: /My list/i}));
    expect(fakeDispatch).toHaveBeenCalled();
  });
});
