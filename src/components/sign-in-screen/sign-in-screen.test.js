import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import SignInScreen from './sign-in-screen';
import {LoadingStatus} from '../../const.js';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore({});
const fakeStore = {
  DATA: {
    sendingDataStatus: LoadingStatus.INITIAL
  },
  USER: {
    authorizationStatus: false,
    user: null
  }
};
let history;
describe(`Test for SignInScreen`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/login`);
    jest.clearAllMocks();
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`SignInScreen should render correctly`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInScreen />
          </Router>
        </Provider>
    );

    expect(screen.getAllByRole(`link`, {name: /W T W/i})[0]).toBeInTheDocument();
    expect(screen.getAllByRole(`link`, {name: /W T W/i})[1]).toBeInTheDocument();
    expect(screen.getByRole(`heading`, {name: /Sign in/i})).toBeInTheDocument();
    expect(screen.getByRole(`button`, {name: /Sign in/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
  it(`SignInScreen should redirect to Mainscreen when user clicks on logo`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/login`}>
                <SignInScreen />
              </Route>
              <Route exact path={`/`}><div>Mock Main Screen</div></Route>
            </Switch>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[0]);
    expect(screen.getByText(/Mock Main Screen/i)).toBeInTheDocument();
    history.push(`/login`);
    userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[1]);
    expect(screen.getByText(/Mock Main Screen/i)).toBeInTheDocument();
  });
  it(`When user write text in input it should be updated`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInScreen />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/Email address/i), `test@test.ru`);
    expect(screen.getByPlaceholderText(/Email address/i)).toHaveValue(`test@test.ru`);
  });
  it(`When user send incorrect email toast appears`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInScreen />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/Email address/i), `test@te`);
    userEvent.click(screen.getByRole(`button`, {name: `Sign in`}));
    expect(screen.getByText(`Please input correct email`)).toBeInTheDocument();
  });
  it(`When user send empty password toast appears`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInScreen />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/Email address/i), `test@test.ru`);
    userEvent.type(screen.getByPlaceholderText(/Password/i), ``);
    userEvent.click(screen.getByRole(`button`, {name: `Sign in`}));
    expect(screen.getByText(`Please input password`)).toBeInTheDocument();
  });
  it(`When form submit, it disabled`, () => {
    const store = mockStore({
      ...fakeStore,
      DATA: {
        ...fakeStore.DATA,
        sendingDataStatus: LoadingStatus.FETCHING
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInScreen />
          </Router>
        </Provider>
    );

    expect(screen.getByPlaceholderText(/Email address/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDisabled();
    expect(screen.getByRole(`button`, {name: `Sending...`})).toBeDisabled();
  });
  it(`SignInScreen should redirect to main screen when user fill inputs and click on sign in button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInScreen />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/Email address/i), `test@test.ru`);
    userEvent.type(screen.getByPlaceholderText(/Password/i), `password`);

    userEvent.click(screen.getByRole(`button`, {name: /Sign in/i}));
    expect(fakeDispatch).toHaveBeenCalled();
  });
});
