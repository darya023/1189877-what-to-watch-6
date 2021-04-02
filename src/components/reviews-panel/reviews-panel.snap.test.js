import React from 'react';
import {render} from '@testing-library/react';
import ReviewsPanel from './reviews-panel';

const fakeReviews = [
  {
    text: `Test 1`,
    date: `2021-02-23T08:04:28.658Z`,
    id: `1`,
    rating: 3.2,
    authorId: `19`,
    authorName: `Test1`
  },
  {
    text: `Test 2`,
    date: `2020-02-03T08:00:28.000Z`,
    id: `1`,
    rating: 7,
    authorId: `2`,
    authorName: `Test2`
  }
];

describe(`Test for ReviewsPanel`, () => {
  it(`Should ReviewsPanel render correctly`, () => {
    const {container} = render(
        <ReviewsPanel
          reviews={fakeReviews}
        />
    );
    expect(container).toMatchSnapshot();
  });
  it(`Should ReviewsPanel render correctly without reviews`, () => {
    const {container} = render(
        <ReviewsPanel
          reviews={[]}
        />
    );
    expect(container).toMatchSnapshot();
  });
});
