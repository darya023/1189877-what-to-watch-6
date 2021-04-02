import React from 'react';
import {render} from '@testing-library/react';
import OverviewPanel from './overview-panel';

it(`Should OverviewPanel render correctly`, () => {
  const {container} = render(
      <OverviewPanel
        description="Test"
        director="Test"
        starring={[`Name Test`, `Name Test2`]}
        rating={4.5}
        reviewsCount={500}
      />
  );
  expect(container).toMatchSnapshot();
});
