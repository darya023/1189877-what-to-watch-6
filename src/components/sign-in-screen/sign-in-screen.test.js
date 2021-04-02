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
});
