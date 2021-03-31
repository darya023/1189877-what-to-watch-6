import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
history.push(`/test`);
it(`NotFoundScreen should redirect to Mainscreen when user clicks on logo`, () => {
  render(
      <Router history={history}>
        <Switch>
          <Route exact path={`/test`}>
            <NotFoundScreen />
          </Route>
          <Route exact path={`/`}><div>Mock Main Screen</div></Route>
        </Switch>
      </Router>
  );

  userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[0]);
  expect(screen.getByText(/Mock Main Screen/i)).toBeInTheDocument();
  history.push(`/test`);
  userEvent.click(screen.getAllByRole(`link`, {name: /W T W/i})[1]);
  expect(screen.getByText(/Mock Main Screen/i)).toBeInTheDocument();
});
