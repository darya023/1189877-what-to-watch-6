import React from 'react';
import {render} from '@testing-library/react';
import ShowMoreButton from './show-more-button';

it(`Should ShowMoreButton render correctly`, () => {
  const {container} = render(
      <ShowMoreButton
        onShowMoreButtonClick={jest.fn()}
      />
  );
  expect(container).toMatchSnapshot();
});
