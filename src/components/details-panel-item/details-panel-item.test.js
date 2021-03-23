import React from 'react';
import {render} from '@testing-library/react';
import DetailsPanelItem from './details-panel-item';

it(`Should DetailsPanelItem render correctly`, () => {
  const {container} = render(<DetailsPanelItem name="Director" value="Name" />);
  expect(container).toMatchSnapshot();

  const starring = [`Name Test`, `Name Test2`];

  const {container: withChildren} = render(
      <DetailsPanelItem name="Starring">
        {
          starring.map((actor)=>{
            return <React.Fragment key={actor}>
              {actor}<br />
            </ React.Fragment>;
          })
        }
      </DetailsPanelItem>);
  expect(withChildren).toMatchSnapshot();
});
