import React from 'react';
import {render} from '@testing-library/react';
import OverwiewPanel from './overview-panel';

it(`Should OverwiewPanel render correctly`, () => {
  const {container} = render(
      <OverwiewPanel
        description="Test"
        director="Test"
        starring={[`Name Test`, `Name Test2`]}
        rating={4.5}
        reviewsCount={500}
      />
  );
  expect(container).toMatchSnapshot();
});
