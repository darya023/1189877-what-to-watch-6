import React from 'react';
import {render} from '@testing-library/react';
import DetailsPanel from './details-panel';

it(`Should DetailsPanel render correctly`, () => {
  const {container} = render(<DetailsPanel
    genre="test"
    year={2000}
    director="Name"
    starring={[`Name Test`, `Name Test2`]}
    duration={150}
  />);
  expect(container).toMatchSnapshot();
});
