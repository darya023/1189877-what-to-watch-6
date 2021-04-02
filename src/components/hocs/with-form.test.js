import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import withForm from './with-form.jsx';
import ReviewForm from '../review-form/review-form';

jest.mock(`../review-form/review-form`, () => {
  const mockReviewForm = (ref) => <div ref={ref}>This is mock ReviewForm</div>;
  mockReviewForm.displayName = `MockReviewForm`;
  return {
    __esModule: true,
    default: () => {
      return mockReviewForm();
    }
  };
});

const fakeFilm = {
  id: `1`,
  title: `The Grand Budapest Hotel`,
  image: ``,
  poster: ``,
  backgroundImage: ``,
  backgroundColor: `blue`,
  genre: `Drama`,
  year: 2014,
  video: ``,
  promoVideo: ``,
  description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  duration: 120,
  rating: 7.5,
  reviewsCount: 3,
  isFavorite: false,
};

describe(`Test HOC withForm`, () => {
  it(`Base component should be correct rendering when use with HOC`, () => {
    const BaseComponent = React.forwardRef(({}, ref) => <div ref={ref}>withForm</div>);
    BaseComponent.displayName = `BaseComponent`;
    const BaseComponentWrapped = withForm(BaseComponent);
    render(<BaseComponentWrapped />);
    expect(screen.getByText(/withForm/i)).toBeInTheDocument();
  });
  it(`Base component should be correct rendering another component when use with HOC`, () => {
    const history = createMemoryHistory();
    // eslint-disable-next-line
    const BaseComponentWrapped = withForm(React.forwardRef((_, ref)=>ReviewForm(ref)));
    render(
        <Router history={history}>
          <BaseComponentWrapped
            currentFilmID={fakeFilm.id}
          >
          </BaseComponentWrapped>
        </Router>
    );

    expect(screen.getByText(/This is mock ReviewForm/i)).toBeInTheDocument();
  });
});
