import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Header from './header.jsx';

const mockStore = configureStore({});

let history;

describe(`Test for Header`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`Header should render correctly`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: false,
        user: null,
      },
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Header className="test" />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
  it(`Header should render correctly without User component`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: false,
        user: null,
      },
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Header withoutUserComponent={true} className="test" />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
  it(`Header should render correctly with children`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: false,
        user: null,
      },
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Header className="test">
              <div>Test</div>
            </Header>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
  it(`Header should render correctly with children and without User component`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: false,
        user: null,
      },
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Header withoutUserComponent={true} className="test">
              <div>Test</div>
            </Header>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
