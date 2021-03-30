import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MyListScreen from './my-list-screen';
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
describe(`Test for MyListScreen`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/mylist`);
    jest.clearAllMocks();
  });

  it(`MyListScreen should render correctly`, () => {

    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <MyListScreen />
          </Router>
        </Provider>
    );

    expect(screen.getAllByRole(`link`, {name: /W T W/i})[0]).toBeInTheDocument();
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[1]).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /User avatar/i})).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
  it(`MyListScreen should redirect to main screen when user click on logo`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <PrivateRoute
                path="/mylist"
                exact
                component={()=><MyListScreen />}
              />
              <Route exact path={`/`}><div>Mock Main Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[0]);
    expect(screen.getByText(/Mock Main Screen/i)).toBeInTheDocument();
    history.push(`/mylist`);
    userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[1]);
    expect(screen.getByText(/Mock Main Screen/i)).toBeInTheDocument();
  });
  it(`MyListScreen should redirect to mylist screen when user authoirized and click on User avatar`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <PrivateRoute
                path="/mylist"
                exact
                component={()=><MyListScreen />}
              />
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /User avatar/i}));
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[0]).toBeInTheDocument();
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[1]).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /User avatar/i})).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
  it(`MyListScreen should redirect to signin screen when user not authoirized`, () => {
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
              <PrivateRoute
                path="/mylist"
                exact
                component={()=><MyListScreen />}
              />
              <Route exact path={`/login`}><div>Mock Signin Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Mock Signin Screen/i));
  });
  it(`MyListScreen should redirect to film screen when user click on film card`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <PrivateRoute
                path="/mylist"
                exact
                component={()=><MyListScreen />}
              />
              <Route exact path={`/films/:id`}><div>Mock Film Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /test2/i}));
    expect(screen.getByText(/Mock Film Screen/i));
  });
});
