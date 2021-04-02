import React from 'react';
import {render} from '@testing-library/react';
import Footer from './footer';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';

it(`Should Footer render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <Footer />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
