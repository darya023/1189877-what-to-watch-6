import React from 'react';
import {render} from '@testing-library/react';
import ReviewsPanel from './reviews-panel';

it(`Should ReviewsPanel render correctly`, () => {
  const {container} = render(
      <ReviewsPanel
        reviews={[]}
      />
  );
  expect(container).toMatchSnapshot();
});
