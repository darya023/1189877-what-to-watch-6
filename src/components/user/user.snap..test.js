import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';
import User from './user.jsx';

const mockStore = configureStore({});

let history;

describe(`Test for User`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`User should render correctly if unauthorized`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: false,
        user: null,
      },
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <User />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
  it(`User should render correctly if unauthorized`, () => {
    const fakeUser = {
      id: `1`,
      name: `User`,
      image: ``,
      email: `test@test.ru`
    };
    const store = mockStore({
      USER: {
        authorizationStatus: true,
        user: fakeUser,
      },
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <User />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
