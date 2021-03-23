import React from 'react';
import {render} from '@testing-library/react';
import Poster from './poster';

it(`Should Poster render correctly`, () => {
  const {container} = render(
      <Poster
        src=""
        alt="Test"
      />
  );
  expect(container).toMatchSnapshot();
});
