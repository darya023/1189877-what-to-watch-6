import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import FilmScreen from './film-screen';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
import * as redux from 'react-redux';

import userEvent from '@testing-library/user-event';
import PrivateRoute from '../private-route/private-route';

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
describe(`Test for FilmScreen`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/films/${fakeFilm.id}`);
    jest.clearAllMocks();
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`FilmScreen should render correctly`, () => {
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
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        films: fakeFilms
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <FilmScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(screen.getAllByRole(`link`, {name: /W T W/i})[0]).toBeInTheDocument();
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[1]).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /User avatar/i})).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.genre))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.year))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.rating))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.description))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.reviewsCount))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.director))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.starring[0]))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.starring[1]))).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Good/i)).toBeInTheDocument();
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`FilmScreen should render correctly without similar films`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <FilmScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(screen.getAllByRole(`link`, {name: /W T W/i})[0]).toBeInTheDocument();
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[1]).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /User avatar/i})).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.genre))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.year))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.rating))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.description))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.reviewsCount))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.director))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.starring[0]))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.starring[1]))).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Good/i)).toBeInTheDocument();
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.queryByText(/More like this/i)).not.toBeInTheDocument();
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`FilmScreen should redirect to main screen when user click on logo`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/films/:id`}>
                <FilmScreen
                  currentFilmID={fakeFilm.id}
                />
              </Route>
              <Route exact path={`/`}><div>Mock Main Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[0]);
    expect(screen.getByText(/Mock Main Screen/i));
    history.push(`/films/${fakeFilm.id}`);
    userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[1]);
    expect(screen.getByText(/Mock Main Screen/i));
  });
  it(`FilmScreen should redirect to mylist screen when user authoirized and click on User avatar`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/films/:id`}>
                <FilmScreen
                  currentFilmID={fakeFilm.id}
                />
              </Route>
              <Route exact path={`/mylist`}><div>Mock MyList Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /User avatar/i}));
    expect(screen.getByText(/Mock MyList Screen/i));
  });
  it(`FilmScreen should redirect to signin screen when user not authoirized click on Sign in`, () => {
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
              <Route exact path={`/films/:id`}>
                <FilmScreen
                  currentFilmID={fakeFilm.id}
                />
              </Route>
              <Route exact path={`/login`}><div>Mock Signin Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /Sign in/i}));
    expect(screen.getByText(/Mock Signin Screen/i));
  });
  it(`FilmScreen should redirect to player screen when user click on Play button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/films/:id`}>
                <FilmScreen
                  currentFilmID={fakeFilm.id}
                />
              </Route>
              <Route exact path={`/player/:id`}><div>Mock Player Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /Play/i}));
    expect(screen.getByText(/Mock Player Screen/i));
  });
  it(`FilmScreen should redirect to add review screen when user click on Add review button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/films/:id`}>
                <FilmScreen
                  currentFilmID={fakeFilm.id}
                />
              </Route>
              <Route exact path={`/films/:id/review`}><div>Mock Add Review Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /Add review/i}));
    expect(screen.getByText(/Mock Add Review Screen/i));
  });
  it(`FilmScreen should call dispatch when user authorized and click on + My list button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <FilmScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`button`, {name: /My list/i}));
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`FilmScreen should redirect to signin screen when user not authorized and click on + My list button`, () => {
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
            <FilmScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`button`, {name: /My list/i}));
    expect(fakeDispatch).toHaveBeenCalled();
  });
});
