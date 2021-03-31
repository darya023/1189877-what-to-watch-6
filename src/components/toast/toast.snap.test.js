import React from 'react';
import {render} from '@testing-library/react';
import Toast from './toast';

it(`Should Toast render correctly`, () => {
  const {container} = render(
      <Toast text="test" />
  );
  expect(container).toMatchSnapshot();

  const {container: withChildren} = render(
      <Toast text="test">
        <div>Test</div>
      </Toast>
  );
  expect(withChildren).toMatchSnapshot();
});
