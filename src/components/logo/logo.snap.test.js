import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import Logo from './logo';

it(`Should Logo render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <Logo />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
