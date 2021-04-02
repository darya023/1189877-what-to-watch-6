import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import AddReviewScreen from './add-review-screen';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
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
    currentFilm: null,
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
describe(`Test for AddReviewScreen`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/films/${fakeFilm.id}/review`);
  });

  it(`AddReviewScreen should render correctly`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <AddReviewScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByRole(`link`, {name: /W T W/i})).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /User avatar/i})).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeFilm.title))).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });
  it(`AddReviewScreen should redirect to previous films page when user clicks on breadcrumps link`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path={`/films/:id/review`}
                component={ () => <AddReviewScreen
                  currentFilmID={fakeFilm.id}
                />}
              />
              <Route exact path={`/films/:id`}><div>Mock Film Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByText(new RegExp(fakeFilm.title)));
    expect(screen.getByText(/Mock Film Screen/i));
  });
  it(`AddReviewScreen should redirect to main screen when user clicks on logo`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path={`/films/:id/review`}
                component={ () => <AddReviewScreen
                  currentFilmID={fakeFilm.id}
                />}
              />
              <Route exact path={`/`}><div>Mock Main Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /W T W/i}));
    expect(screen.getByText(/Mock Main Screen/i));
  });
  it(`AddReviewScreen should redirect to mylist screen when user clicks on User avatar`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path={`/films/:id/review`}
                component={ () => <AddReviewScreen
                  currentFilmID={fakeFilm.id}
                />}
              />
              <Route exact path={`/mylist`}><div>Mock MyList Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`link`, {name: /User avatar/i}));
    expect(screen.getByText(/Mock MyList Screen/i));
  });
  it(`AddReviewScreen should render Spinner when data is loading`, () => {
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        filmLoadingStatus: LoadingStatus.FETCHING
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <AddReviewScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByTestId(`spinner`)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilm.title))).not.toBeInTheDocument();
    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Post/i)).not.toBeInTheDocument();
  });
  it(`AddReviewScreen should render NotFoundScreen when current film not found`, () => {
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        currentFilmID: `test`
      }
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <AddReviewScreen
              currentFilmID={fakeFilm.id}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to homepage/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeFilm.title))).not.toBeInTheDocument();
    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Post/i)).not.toBeInTheDocument();
  });
  it(`AddReviewScreen should redirect to signin screen when user not authoirized`, () => {
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
              <PrivateRoute exact path={`/films/:id/review`}
                component={ () => <AddReviewScreen
                  currentFilmID={fakeFilm.id}
                />}
              />
              <Route exact path={`/login`}><div>Mock Signin Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Mock Signin Screen/i));
  });
});
