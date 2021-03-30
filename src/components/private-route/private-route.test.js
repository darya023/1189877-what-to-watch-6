import React from 'react';
import {Router, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {PrivateRoute} from './private-route';

const mockStore = configureStore({});
let history;
describe(`Test for PrivateRouter`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/private`);
  });

  it(`Should render component for public route when user not authorized`, () => {
    const store = mockStore({
      USER: {authorizationStatus: false}
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <Route exact path="/login"><div>Public Route</div></Route>
            <PrivateRoute
              exact
              path="/private"
              component={() => (<div>Private Route</div>)}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });
  it(`Should render component for private route when user authorized`, () => {
    const store = mockStore({
      USER: {authorizationStatus: true}
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <Route exact path="/login"><div>Public Route</div></Route>
            <PrivateRoute
              exact
              path="/private"
              component={() => (<div>Private Route</div>)}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
