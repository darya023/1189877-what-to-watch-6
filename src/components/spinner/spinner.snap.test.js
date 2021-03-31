import React from 'react';
import {render} from '@testing-library/react';
import Spinner from './spinner';

it(`Should Spinner render correctly`, () => {
  const {container} = render(<Spinner />);
  expect(container).toMatchSnapshot();
});
