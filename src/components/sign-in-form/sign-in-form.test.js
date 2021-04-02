import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import SignInForm from './sign-in-form';
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
describe(`Test for SignInForm`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/login`);
    jest.clearAllMocks();
  });
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`SignInForm should render correctly`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInForm />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
  it(`When user write text in input it should be updated`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInForm />
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
            <SignInForm />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/Email address/i), `test@te`);
    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByText(`Please input correct email`)).toBeInTheDocument();
  });
  it(`When user send empty password toast appears`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInForm />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/Email address/i), `test@test.ru`);
    userEvent.type(screen.getByPlaceholderText(/Password/i), ``);
    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByText(`Please input password`)).toBeInTheDocument();
  });
  it(`When user send invalid data form is shaking`, () => {
    const store = mockStore(fakeStore);
    const onSubmit = jest.fn();
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <SignInForm onSubmit={()=>onSubmit(false)}/>
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByText(/Sign in/i));
    expect(container.querySelector(`.shake`)).toBeInTheDocument();
    // expect(onSubmit).toBeCalled();
  });
  it(`SignInForm should redirect to main screen when user fill inputs and click on sign in button`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <SignInForm />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/Email address/i), `test@test.ru`);
    userEvent.type(screen.getByPlaceholderText(/Password/i), `password`);

    userEvent.click(screen.getByText(/Sign in/i));
    expect(fakeDispatch).toHaveBeenCalled();
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
            <SignInForm />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByRole(`button`, {name: `Sending...`}));
    expect(screen.getByPlaceholderText(/Email address/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDisabled();
    expect(screen.getByRole(`button`, {name: `Sending...`})).toBeDisabled();
  });
});
