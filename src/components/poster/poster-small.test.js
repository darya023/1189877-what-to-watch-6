import React from 'react';
import {render} from '@testing-library/react';
import PosterSmall from './poster-small';

it(`Should PosterSmall render correctly`, () => {
  const {container} = render(
      <PosterSmall
        src=""
        alt="Test"
        className="movie-card__poster--small"
      />
  );
  expect(container).toMatchSnapshot();
});
