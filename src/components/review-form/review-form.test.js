import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {LoadingStatus, INITIAL_GENRE} from '../../const.js';
import ReviewForm from './review-form';
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

describe(`Test for ReviewForm`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/films/${fakeFilm.id}/review`);

  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`ReviewForm should render correctly`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <ReviewForm currentFilmID={fakeFilm.id} />
          </Router>
        </Provider>
    );

    expect(screen.getAllByLabelText(/Rating/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });
  it(`when user clicks one of Rating Button it should be checked`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <ReviewForm currentFilmID={fakeFilm.id} />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getAllByLabelText(/Rating/i)[0]);
    expect(screen.getAllByLabelText(/Rating/i)[0]).toBeChecked();
  });
  it(`When user write text in textarea it should be updated`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <ReviewForm currentFilmID={fakeFilm.id} />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByRole(`textbox`), `Test`);
    expect(screen.getByRole(`textbox`)).toHaveValue(`Test`);

  });
  it(`When user clicks post button on ReviewForm with correct fields values it should call onSubmit and redirect`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <ReviewForm currentFilmID={fakeFilm.id} />
          </Router>
        </Provider>
    );

    const ratingStars = screen.getAllByLabelText(/Rating/i)[0];
    const textbox = screen.getByRole(`textbox`);
    const button = screen.getByRole(`button`);
    userEvent.click(ratingStars);
    expect(ratingStars).toBeChecked();
    const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consectetur repellat illo neque voluptate alias saepe officiis impedit, non autem doloribus nostrum doloremque ipsam recusandae earum. Ipsam laborum cum dolores!`;
    userEvent.type(textbox, text);
    expect(textbox).toHaveValue(text);
    userEvent.click(button);
    expect(textbox).not.toBeDisabled();
    expect(button).not.toBeDisabled();
    expect(ratingStars).not.toBeDisabled();
    expect(fakeDispatch).toHaveBeenCalled();
  });
  it(`When user clicks post button on ReviewForm with incorrect (short) textarea value Toast component appears and form disable`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <ReviewForm currentFilmID={fakeFilm.id} />
          </Router>
        </Provider>
    );

    const text = `Test`;
    userEvent.type(screen.getByRole(`textbox`), text);
    expect(screen.getByRole(`textbox`)).toHaveValue(text);
    userEvent.click(screen.getByRole(`button`));
    expect(screen.getByRole(`textbox`)).toBeDisabled();
    expect(screen.getByRole(`button`)).toBeDisabled();
    expect(screen.getAllByLabelText(/Rating/i)[0]).toBeDisabled();

    expect(screen.getByText(`Review must be more than 50 symbols.`)).toBeInTheDocument();
  });
  it(`When user clicks post button on ReviewForm with incorrect (long) textarea value Toast component appears  and form disable`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <ReviewForm currentFilmID={fakeFilm.id} />
          </Router>
        </Provider>
    );

    const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consectetur repellat illo neque voluptate alias saepe officiis impedit, non autem doloribus nostrum doloremque ipsam recusandae earum. Ipsam laborum cum dolores!Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consectetur repellat illo neque voluptate alias saepe officiis impedit, non autem doloribus nostrum doloremque ipsam recusandae earum. Ipsam laborum cum dolores!Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consectetur repellat illo neque voluptate alias saepe officiis impedit, non autem doloribus nostrum doloremque ipsam recusandae earum. Ipsam laborum cum dolores!`;
    userEvent.type(screen.getByRole(`textbox`), text);
    expect(screen.getByRole(`textbox`)).toHaveValue(text);
    userEvent.click(screen.getByRole(`button`));
    expect(screen.getByRole(`textbox`)).toBeDisabled();
    expect(screen.getByRole(`button`)).toBeDisabled();
    expect(screen.getAllByLabelText(/Rating/i)[0]).toBeDisabled();

    expect(screen.getByText(`Review must be less than 400 symbols.`)).toBeInTheDocument();
  });
});
